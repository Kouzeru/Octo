"use strict";

////////////////////////////////////
//
//   Emulator Execution
//
////////////////////////////////////

//must be set > 0
var scaleFactor = 3;
//dom id for canvas element
var renderTarget = "target"
var targetCanvas = null

const optionFlags = [
	"tickrate",
	"fillColor",
	"fillColor2",
	"blendColor",
	"backgroundColor",
	"buzzColor",
	"quietColor",
	"shiftQuirks",
	"loadStoreQuirks",
	"vfOrderQuirks",
	"clipQuirks",
	"vBlankQuirks",
	"jumpQuirks",
	"screenRotation",
	"maxSize",
	"touchInputMode",
	"logicQuirks",
	"fontStyle",
	"audioVolume",
]
function unpackOptions(emulator, options) {
	optionFlags.forEach(x => { if (x in options) emulator[x] = options[x] })
	if (options["enableXO"]) emulator.maxSize = 65024 // legacy option
}
function packOptions(emulator) {
	const r = {}
	optionFlags.forEach(x => r[x] = emulator[x])
	return r
}

function setRenderTarget(scale, canvas) {
	renderTarget = canvas;
	targetCanvas = document.getElementById(canvas);
	var r = targetCanvas;
	var g = r.getContext("2d");

	if(r.canvas == undefined){
		r.canvas = g.createImageData(256,128);
		r.last = new Uint8Array(256*128); // last pixels
		r.col = new Uint32Array(16) // last palette
	}

	for(var i=0;i<256*128;i++) r.last[i]=255 // clear last buffer

	r.eq = false; // is new frame equal to last frame?
	
	var rot= emulator.screenRotation.toString()+"deg"
	
	r.style.transform = "scale("+scale+","+scale+") rotate("+rot+")"
	r.style.transformOrigin = "center center"
	r.style.imageRendering = "pixelated"
	
	scaleFactor = scale;
}

function getColor(id) {
	return emulator.getColor(id);
}

function renderDisplay(emulator){
	var r = targetCanvas;
	var g = r.getContext("2d");
	var w = 64 << emulator.hires; // width resolution
	var h = 32 << emulator.hires; // height resolution
	var s =  4 >> emulator.hires; // resolution scaling
	var z =  1 << emulator.scale; // internal scaling

	var p = emulator.p; // new pixels
	var pn = emulator.pan;
	
	r.eq = true;  // are they equal to previous frame?

	var c = [] // new colors
	for(var i = 0; i < 16; i++){
		g.fillStyle = emulator.palette[i];
		let C = parseInt(g.fillStyle.slice(1),16);
		let R = 255 & C >> 16;
		let G = 255 & C >> 8;
		let B = 255 & C;
		let A = 255;
		c.push([R,G,B,A])
		if(r.col[i] != C){
			r.col[i] = C; // not equal,
			r.eq = false; // because colors changed
		}
	}

	var i = 0
	var n = r.last;
	var d = r.canvas.data;
	for(var y = 0; y < h/z; y++){
		for(var j = 0; j < s*z; j++){
			for(var x = 0; x < w/z; x++){
				let la = (x+pn[0].x) % w + ((y+pn[0].y) % h) * w;
				let lb = (x+pn[1].x) % w + ((y+pn[1].y) % h) * w;
				let lc = (x+pn[2].x) % w + ((y+pn[2].y) % h) * w;
				let ld = (x+pn[3].x) % w + ((y+pn[3].y) % h) * w;
				var cId = 
					p[0][la]<<0| // plane 1
					p[1][lb]<<1| // plane 2
					p[2][lc]<<2| // plane 4
					p[3][ld]<<3; // plane 8
				var q = c[cId];
				for(var k = 0; k < s*z; k++, i+=4){
					if(n[i/4] != cId){
						n[i/4] = cId; // not equal, 
						r.eq = false; // because pixels changed
					}
					if(!r.eq){
						d[i+0] = q[0]; // R
						d[i+1] = q[1]; // G
						d[i+2] = q[2]; // B
						d[i+3] = q[3]; // A
					}
				}
			}
		}
	}

	if(!r.eq){
		g.putImageData(r.canvas,0,0);
	}
}

////////////////////////////////////
//
//   Audio Playback
//
////////////////////////////////////

var audio;
var audioNode;
var audioSource;
var audioData;
var XOAudio;

var AudioBuffer = function(buffer, duration) {
	if (!(this instanceof AudioBuffer)) {
		return new AudioBuffer(buffer, duration);
	}

	this.pointer = 0;
	this.buffer = buffer;
	this.duration = duration;
}

AudioBuffer.prototype.write = function(buffer, index, size) {
	size = Math.max(0, Math.min(size, this.duration))
	if (!size) { return size; }

	this.duration -= size;
	var bufferSize = this.buffer[0].length;
	var end = index + size;

	for(var i = index; i < end; ++i) {
		buffer[0][i] = this.buffer[0][this.pointer];
		buffer[1][i] = this.buffer[1][this.pointer];
		this.pointer = (this.pointer+1)%bufferSize;
	}

	return size;
}

AudioBuffer.prototype.dequeue = function(duration) {
	this.duration -= duration;
}

AudioBuffer.prototype.mix = function(audioBuffer){
	var buf = audioBuffer.buffer;
	var len = Math.min(this.buffer[0].length,buf[0].length);
	for(var i = 0; i < len; i++){
		this.buffer[0][i] += buf[0][i];
		this.buffer[1][i] += buf[1][i];
	}
}

var FREQ = 4000;
var PITCH_BIAS = 64;

function audioEnable() {
	// this will only work if called directly from a user-generated input handler:
	if (audio && audio.state == 'suspended') audio.resume()
}

function audioSetup(emulator) {
	if (!audio) {
		if (typeof AudioContext !== 'undefined') {
			audio = new AudioContext();
		}
		else if (typeof webkitAudioContext !== 'undefined') {
			audio = new webkitAudioContext();
		}
	}
	audioEnable()
	if (audio && !audioNode) {
		const bufferSize = // set bufferSize according to environment's samplerate
		audio.sampleRate <  64000 ? 2048 : // for 48000hz or 44100hz or less
		audio.sampleRate < 128000 ? 4096 : 8192; // for 96000hz or more
		audioNode = audio.createScriptProcessor(bufferSize, 0, 2);
		audioNode.gain = audio.createGain();
		audioNode.gain.gain.value = emulator.audioVolume
		audioNode.onaudioprocess = function(audioProcessingEvent) {
			var outputBuffer = audioProcessingEvent.outputBuffer;
			var outputData = [
				outputBuffer.getChannelData(0),
				outputBuffer.getChannelData(1)]
			var samples_n = outputBuffer.length;
			var index = 0;
			while(audioData.length && index < samples_n) {
				var size = samples_n - index;
				var written = audioData[0].write(outputData, index, size);
				index += written;
				if (written < size) {
					audioData.shift();
				}
			}

			while(index < samples_n) {
				outputData[0][index++] = 0;
				outputData[1][index++] = 0;
			}
			//the last one can be long sound with high value of buzzer, so always keep it
			if (audioData.length > 1) {
				var audioDataSize = 0;
				var audioBufferSize = audioNode.bufferSize;
				audioData.forEach(function(buffer) { audioDataSize += buffer.duration; })
				while(audioDataSize > audioBufferSize && audioData.length > 1) {
					audioDataSize -= audioData.shift().duration;
				}
			}
		}
		audioData = [];
		audioNode.connect(audioNode.gain);
		audioNode.gain.connect(audio.destination);

		XOAudio = new AudioControl();
		emulator.buzzTimer  = _ => XOAudio.setTimer(_);
		emulator.buzzBuffer = _ => XOAudio.setBuffer(_);
		emulator.buzzPitch  = _ => XOAudio.setPitch(_);
		emulator.buzzVolume = _ => XOAudio.setVolume(_);
		emulator.buzzSelect = _ => XOAudio.setSelect(_);
		emulator.buzzChannel= _ => XOAudio.setChannel(_);

		XOAudio.setBuffer([[0,255,0,255,0,255,0,255,0,255,0,255,0,255,0,255],1]);
	}
	return audio && audioNode
}

function stopAudio() {
	if (!audio) { return; }
	if (audioNode) {
		audioNode.disconnect();
		audioNode = null;
	}
	audioData = [];
}

function playPattern(soundLength,buffer,pitch=PITCH_BIAS,
	sampleState=[[0,0,0],[0,0,0]],gains=[1,1]) {
	if (!audio) { return; }
	audioEnable()
	
	var samples = Math.ceil(audio.sampleRate * soundLength);
	var audioBuffer = [
		new Float32Array(samples),
		new Float32Array(samples)];
		
	if(buffer.length==0) buffer = [0];
	var bufferLen = buffer.length;
		
	// keep super-sampling consistent with audio sample rate
	var quality = Math.ceil(96000 / audio.sampleRate );
		
	var freq = FREQ*2**((pitch-PITCH_BIAS)/48);
	var step = freq / audio.sampleRate / quality;

	var lowpass = 2; // compact second-order low-pass filter preset.
	// the current preset is only intended to smooth out supersamples
	// to decimate, not filtering audible trebles. Though the below code
	// could be uncommented to demonstrate lowpass filtered output:
	// var lowpass = 16 // Higher the value, stronger the lowpass.
	
	var newSampleState = [];
	for(var channel = 0; channel < 2; channel++){
		// retrieve current sample states
		var pos = Math.fround(sampleState[channel][0]); // sample position
		var val = Math.fround(sampleState[channel][1]); // first term
		var vel = Math.fround(sampleState[channel][2]); // second term
		var gain = gains[channel];
		
		for(var i = 0, il = samples; i < il; i++) {
			for (var j = 0; j < quality; ++j) {
				var sample = buffer[parseInt(pos)] / 255;
				vel += sample*gain - val - vel / lowpass;
				val += vel / lowpass / lowpass;
				pos = ( pos + step ) % bufferLen;
			}
			audioBuffer[channel][i] = val;
		}
		newSampleState.push([pos,val,vel]);
	}

	audioData.push(new AudioBuffer(audioBuffer, samples));
	
	return newSampleState;
}

function sampleBuffer(buffer=[0],mode=0){

	//  Each sample will be always normalized to byte range, suppose:
	//  mode 0: 1-bit sample 0bA normalized to 0bAAAAAAAA
	//  mode 1: 2-bit sample 0bAB normalized to 0bABABABAB
	//  mode 2: 4-bit sample 0bABCD normalized to 0bABCDABCD
	//  mode 3: 8-bit sample 0bABCDEFGH simply skips this process

	var bitDepth = 1 << mode;
	var samplesPerByte = 8 >> mode;
	var bitMasker = ( ( 1 << bitDepth ) - 1 ) << 8;
	var sampleLen = buffer.length * samplesPerByte;
	var sampleData = new Uint8Array(sampleLen);
	for(var i = 0, j = 0; j < sampleLen; i = ++i % buffer.length){
		for(var a = 0, cell = buffer[i]; a < samplesPerByte; a++){
			var sampleValue = ( ( cell <<= bitDepth ) & bitMasker ) >> 8; 
			for(var shifts = bitDepth; shifts < 8; shifts <<= 1)
			sampleValue |= sampleValue << shifts;
			sampleData[j++] = sampleValue;
			cell &= 255;
		}
	}
	return sampleData;
}

function AudioControl(){
	var emptyVoice = new Voice();
	var emptyBuffer = sampleBuffer([0]);
	
	function Voice(){
		this.sample = [[0,0,0],[0,0,0]];
		this.buffer = emptyBuffer;
		this.reset = true;
		this.timer = 0;
		this.pitch = PITCH_BIAS;
		this.volume = 1;
		this.left = true;
		this.right = true;
	}
	
	this.voices = [new Voice(),new Voice(),new Voice(),new Voice()];
	this.voice = this.voices[0];
	
	this.refresh = _ => {
		playPattern(_,emptyBuffer);
		let lastBuffer = audioData.pop();
		for (var i = 0 ; i < this.voices.length; i++) {
			var voice = this.voices[i];
			if (voice.reset) { 
				voice.sample[0][0] = 0;
				voice.sample[1][0] = 0; 
			} 
			voice.reset = false;

			var chGain = !voice.timer?[0,0]:[
				voice.volume*voice.left,
				voice.volume*voice.right,
			];

			voice.sample = playPattern(_,
				voice.buffer,voice.pitch,
				voice.sample,chGain);

			if(voice.timer)
				voice.timer--;
			else
				voice.reset = true;

			lastBuffer.mix(audioData.pop());
		}
		audioData.push(lastBuffer);

		while(audioData.length > 16)
			audioData.shift();
	}
	this.setTimer = (timer) => {
		if(timer == 0) this.voice.reset = true;
		this.voice.timer = timer;
	}
	this.setBuffer = buffer =>{
		this.voice.buffer = sampleBuffer(buffer[0],buffer[1]);
	};
	this.setPitch = pitch => this.voice.pitch = pitch;
	this.setVolume = volume => this.voice.volume = volume/255;
	this.setChannel = mask => {
		this.voice.left=(mask&1)!=0;
		this.voice.right=(mask&2)!=0;
	}
	this.setSelect = select => {
		if(select>3) this.voice= emptyVoice;
		else this.voice=this.voices[select];
	}
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

