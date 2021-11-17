"use strict";

function invertKeymap(k) {
	return Object.keys(k).reduce((a,b) => {
		Object.keys(k[b]).forEach(x => a[x]=+b)
		return a
	}, {})
}

function getPref(key) {
	try { return JSON.parse(localStorage.getItem(key)) }
	catch(e) { console.log(e); return null }
}
function setPref(key, value) {
	try { localStorage.setItem(key, JSON.stringify(value)) }
	catch(e) { console.log(e); }
}

var keymap = (this.STATIC_KEYMAP) || getPref('octoKeymap') || {
	0x0: { x:1 },
	0x1: { 1:1 },
	0x2: { 2:1 },
	0x3: { 3:1 },
	0x4: { q:1 },
	0x5: { w:1, ArrowUp:1 },
	0x6: { e:1, ' ':1 },
	0x7: { a:1, ArrowLeft:1 },
	0x8: { s:1, ArrowDown:1 },
	0x9: { d:1, ArrowRight:1 },
	0xA: { z:1 },
	0xB: { c:1 },
	0xC: { 4:1 },
	0xD: { r:1 },
	0xE: { f:1 },
	0xF: { v:1 },
}

var keymapInverse = invertKeymap(keymap)

var smallfonts = {
	octo: [
		0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
		0x20, 0x60, 0x20, 0x20, 0x70, // 1
		0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
		0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
		0x90, 0x90, 0xF0, 0x10, 0x10, // 4
		0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
		0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
		0xF0, 0x10, 0x20, 0x40, 0x40, // 7
		0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
		0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
		0xF0, 0x90, 0xF0, 0x90, 0x90, // A
		0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
		0xF0, 0x80, 0x80, 0x80, 0xF0, // C
		0xE0, 0x90, 0x90, 0x90, 0xE0, // D
		0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
		0xF0, 0x80, 0xF0, 0x80, 0x80, // F
	],
	vip: [
		0xF0, 0x90, 0x90, 0x90, 0xF0,
		0x60, 0x20, 0x20, 0x20, 0x70,
		0xF0, 0x10, 0xF0, 0x80, 0xF0,
		0xF0, 0x10, 0xF0, 0x10, 0xF0,
		0xA0, 0xA0, 0xF0, 0x20, 0x20,
		0xF0, 0x80, 0xF0, 0x10, 0xF0,
		0xF0, 0x80, 0xF0, 0x90, 0xF0,
		0xF0, 0x10, 0x10, 0x10, 0x10,
		0xF0, 0x90, 0xF0, 0x90, 0xF0,
		0xF0, 0x90, 0xF0, 0x10, 0xF0,
		0xF0, 0x90, 0xF0, 0x90, 0x90,
		0xF0, 0x50, 0x70, 0x50, 0xF0,
		0xF0, 0x80, 0x80, 0x80, 0xF0,
		0xF0, 0x50, 0x50, 0x50, 0xF0,
		0xF0, 0x80, 0xF0, 0x80, 0xF0,
		0xF0, 0x80, 0xF0, 0x80, 0x80,
	],
	dream6800: [
		0xE0, 0xA0, 0xA0, 0xA0, 0xE0,
		0x40, 0x40, 0x40, 0x40, 0x40,
		0xE0, 0x20, 0xE0, 0x80, 0xE0,
		0xE0, 0x20, 0xE0, 0x20, 0xE0,
		0x80, 0xA0, 0xA0, 0xE0, 0x20,
		0xE0, 0x80, 0xE0, 0x20, 0xE0,
		0xE0, 0x80, 0xE0, 0xA0, 0xE0,
		0xE0, 0x20, 0x20, 0x20, 0x20,
		0xE0, 0xA0, 0xE0, 0xA0, 0xE0,
		0xE0, 0xA0, 0xE0, 0x20, 0xE0,
		0xE0, 0xA0, 0xE0, 0xA0, 0xA0,
		0xC0, 0xA0, 0xE0, 0xA0, 0xC0,
		0xE0, 0x80, 0x80, 0x80, 0xE0,
		0xC0, 0xA0, 0xA0, 0xA0, 0xC0,
		0xE0, 0x80, 0xE0, 0x80, 0xE0,
		0xE0, 0x80, 0xC0, 0x80, 0x80,
	],
	eti660: [
		0xE0, 0xA0, 0xA0, 0xA0, 0xE0,
		0x20, 0x20, 0x20, 0x20, 0x20,
		0xE0, 0x20, 0xE0, 0x80, 0xE0,
		0xE0, 0x20, 0xE0, 0x20, 0xE0,
		0xA0, 0xA0, 0xE0, 0x20, 0x20,
		0xE0, 0x80, 0xE0, 0x20, 0xE0,
		0xE0, 0x80, 0xE0, 0xA0, 0xE0,
		0xE0, 0x20, 0x20, 0x20, 0x20,
		0xE0, 0xA0, 0xE0, 0xA0, 0xE0,
		0xE0, 0xA0, 0xE0, 0x20, 0xE0,
		0xE0, 0xA0, 0xE0, 0xA0, 0xA0,
		0x80, 0x80, 0xE0, 0xA0, 0xE0,
		0xE0, 0x80, 0x80, 0x80, 0xE0,
		0x20, 0x20, 0xE0, 0xA0, 0xE0,
		0xE0, 0x80, 0xE0, 0x80, 0xE0,
		0xE0, 0x80, 0xC0, 0x80, 0x80,
	],
	fish: [
		0x60, 0xA0, 0xA0, 0xA0, 0xC0,
		0x40, 0xC0, 0x40, 0x40, 0xE0,
		0xC0, 0x20, 0x40, 0x80, 0xE0,
		0xC0, 0x20, 0x40, 0x20, 0xC0,
		0x20, 0xA0, 0xE0, 0x20, 0x20,
		0xE0, 0x80, 0xC0, 0x20, 0xC0,
		0x40, 0x80, 0xC0, 0xA0, 0x40,
		0xE0, 0x20, 0x60, 0x40, 0x40,
		0x40, 0xA0, 0x40, 0xA0, 0x40,
		0x40, 0xA0, 0x60, 0x20, 0x40,
		0x40, 0xA0, 0xE0, 0xA0, 0xA0,
		0xC0, 0xA0, 0xC0, 0xA0, 0xC0,
		0x60, 0x80, 0x80, 0x80, 0x60,
		0xC0, 0xA0, 0xA0, 0xA0, 0xC0,
		0xE0, 0x80, 0xC0, 0x80, 0xE0,
		0xE0, 0x80, 0xC0, 0x80, 0x80,
	],
}
var bigfonts = {
	octo: [
		0xFF, 0xFF, 0xC3, 0xC3, 0xC3, 0xC3, 0xC3, 0xC3, 0xFF, 0xFF, // 0
		0x18, 0x78, 0x78, 0x18, 0x18, 0x18, 0x18, 0x18, 0xFF, 0xFF, // 1
		0xFF, 0xFF, 0x03, 0x03, 0xFF, 0xFF, 0xC0, 0xC0, 0xFF, 0xFF, // 2
		0xFF, 0xFF, 0x03, 0x03, 0xFF, 0xFF, 0x03, 0x03, 0xFF, 0xFF, // 3
		0xC3, 0xC3, 0xC3, 0xC3, 0xFF, 0xFF, 0x03, 0x03, 0x03, 0x03, // 4
		0xFF, 0xFF, 0xC0, 0xC0, 0xFF, 0xFF, 0x03, 0x03, 0xFF, 0xFF, // 5
		0xFF, 0xFF, 0xC0, 0xC0, 0xFF, 0xFF, 0xC3, 0xC3, 0xFF, 0xFF, // 6
		0xFF, 0xFF, 0x03, 0x03, 0x06, 0x0C, 0x18, 0x18, 0x18, 0x18, // 7
		0xFF, 0xFF, 0xC3, 0xC3, 0xFF, 0xFF, 0xC3, 0xC3, 0xFF, 0xFF, // 8
		0xFF, 0xFF, 0xC3, 0xC3, 0xFF, 0xFF, 0x03, 0x03, 0xFF, 0xFF, // 9
		0x7E, 0xFF, 0xC3, 0xC3, 0xC3, 0xFF, 0xFF, 0xC3, 0xC3, 0xC3, // A
		0xFC, 0xFC, 0xC3, 0xC3, 0xFC, 0xFC, 0xC3, 0xC3, 0xFC, 0xFC, // B
		0x3C, 0xFF, 0xC3, 0xC0, 0xC0, 0xC0, 0xC0, 0xC3, 0xFF, 0x3C, // C
		0xFC, 0xFE, 0xC3, 0xC3, 0xC3, 0xC3, 0xC3, 0xC3, 0xFE, 0xFC, // D
		0xFF, 0xFF, 0xC0, 0xC0, 0xFF, 0xFF, 0xC0, 0xC0, 0xFF, 0xFF, // E
		0xFF, 0xFF, 0xC0, 0xC0, 0xFF, 0xFF, 0xC0, 0xC0, 0xC0, 0xC0  // F
	],
	schip: [
		0x3C, 0x7E, 0xE7, 0xC3, 0xC3, 0xC3, 0xC3, 0xE7, 0x7E, 0x3C,
		0x18, 0x38, 0x58, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x3C,
		0x3E, 0x7F, 0xC3, 0x06, 0x0C, 0x18, 0x30, 0x60, 0xFF, 0xFF,
		0x3C, 0x7E, 0xC3, 0x03, 0x0E, 0x0E, 0x03, 0xC3, 0x7E, 0x3C,
		0x06, 0x0E, 0x1E, 0x36, 0x66, 0xC6, 0xFF, 0xFF, 0x06, 0x06,
		0xFF, 0xFF, 0xC0, 0xC0, 0xFC, 0xFE, 0x03, 0xC3, 0x7E, 0x3C,
		0x3E, 0x7C, 0xE0, 0xC0, 0xFC, 0xFE, 0xC3, 0xC3, 0x7E, 0x3C,
		0xFF, 0xFF, 0x03, 0x06, 0x0C, 0x18, 0x30, 0x60, 0x60, 0x60,
		0x3C, 0x7E, 0xC3, 0xC3, 0x7E, 0x7E, 0xC3, 0xC3, 0x7E, 0x3C,
		0x3C, 0x7E, 0xC3, 0xC3, 0x7F, 0x3F, 0x03, 0x03, 0x3E, 0x7C,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // no hex chars!
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
	],
	fish: [
		0x7C, 0xC6, 0xCE, 0xDE, 0xD6, 0xF6, 0xE6, 0xC6, 0x7C, 0x00, // at most 7x9 pixels!
		0x10, 0x30, 0xF0, 0x30, 0x30, 0x30, 0x30, 0x30, 0xFC, 0x00,
		0x78, 0xCC, 0xCC, 0x0C, 0x18, 0x30, 0x60, 0xCC, 0xFC, 0x00,
		0x78, 0xCC, 0x0C, 0x0C, 0x38, 0x0C, 0x0C, 0xCC, 0x78, 0x00,
		0x0C, 0x1C, 0x3C, 0x6C, 0xCC, 0xFE, 0x0C, 0x0C, 0x1E, 0x00,
		0xFC, 0xC0, 0xC0, 0xC0, 0xF8, 0x0C, 0x0C, 0xCC, 0x78, 0x00,
		0x38, 0x60, 0xC0, 0xC0, 0xF8, 0xCC, 0xCC, 0xCC, 0x78, 0x00,
		0xFE, 0xC6, 0xC6, 0x06, 0x0C, 0x18, 0x30, 0x30, 0x30, 0x00,
		0x78, 0xCC, 0xCC, 0xEC, 0x78, 0xDC, 0xCC, 0xCC, 0x78, 0x00,
		0x7C, 0xC6, 0xC6, 0xC6, 0x7C, 0x18, 0x18, 0x30, 0x70, 0x00,
		0x30, 0x78, 0xCC, 0xCC, 0xCC, 0xFC, 0xCC, 0xCC, 0xCC, 0x00,
		0xFC, 0x66, 0x66, 0x66, 0x7C, 0x66, 0x66, 0x66, 0xFC, 0x00,
		0x3C, 0x66, 0xC6, 0xC0, 0xC0, 0xC0, 0xC6, 0x66, 0x3C, 0x00,
		0xF8, 0x6C, 0x66, 0x66, 0x66, 0x66, 0x66, 0x6C, 0xF8, 0x00,
		0xFE, 0x62, 0x60, 0x64, 0x7C, 0x64, 0x60, 0x62, 0xFE, 0x00,
		0xFE, 0x66, 0x62, 0x64, 0x7C, 0x64, 0x60, 0x60, 0xF0, 0x00,
	],
	none: new Array(16*10).fill(0x00),
}
var fontsets = {
	octo     : { small: smallfonts.octo,      big: bigfonts.octo  },
	vip      : { small: smallfonts.vip,       big: bigfonts.none  },
	dream6800: { small: smallfonts.dream6800, big: bigfonts.none  },
	eti660   : { small: smallfonts.eti660,    big: bigfonts.none  },
	schip    : { small: smallfonts.octo,      big: bigfonts.schip },
	fish     : { small: smallfonts.fish,      big: bigfonts.fish  },
}

////////////////////////////////////
//
//   The Chip8 Interpreter:
//
////////////////////////////////////

function Emulator() {

	// persistent configuration settings
	this.tickrate           = 20;
	this.fillColor          = "#FFCC00";
	this.fillColor2         = "#FF6600";
	this.blendColor         = "#662200";
	this.backgroundColor    = "#996600";
	this.buzzColor          = "#FFAA00";
	this.quietColor         = "#000000";
	this.shiftQuirks        = false;
	this.loadStoreQuirks    = false;
	this.clipQuirks         = false;
	this.jumpQuirks         = false;
	this.logicQuirks        = false;
	this.vBlankQuirks       = false;
	this.enableXO           = true;
	this.screenRotation     = 0;//must be 0, 90, 180, or 270
	this.maxSize            = 3584;
	this.touchInputMode     = 'none';
	this.maskFormatOverride = true;
	this.numericFormatStr   = "default";
	this.fontStyle          = 'octo';
	this.defaultPalette     = [
		this.backgroundColor,
		this.fillColor,
		this.fillColor2,
		this.blendColor,
		"#000","#000","#000","#000",
		"#000","#000","#000","#000",
		"#000","#000","#000","#000",
	]
	this.palette            = [this.defaultPalette];
	
	Object.defineProperty(this, "backgroundColor", {
		get : function() { return this.defaultPalette[0] },
		set : function(d) { return this.defaultPalette[0] = d }
	});
	Object.defineProperty(this, "fillColor", {
		get : function() { return this.defaultPalette[1] },
		set : function(d) { return this.defaultPalette[1] = d }
	});
	Object.defineProperty(this, "fillColor2", {
		get : function() { return this.defaultPalette[2] },
		set : function(d) { return this.defaultPalette[2] = d }
	});
	Object.defineProperty(this, "blendColor", {
		get : function() { return this.defaultPalette[3] },
		set : function(d) { return this.defaultPalette[3] = d }
	});

	// interpreter state
	this.p  = [ // pixels, as preinitialized array
		new Uint8Array(128*64),
		new Uint8Array(128*64),
		new Uint8Array(128*64),
		new Uint8Array(128*64)
	];
	this.m  = [];       // memory (bytes)
	this.r  = [];       // return stack
	this.v  = [];       // registers
	this.pc = 0;        // program counter
	this.i  = 0;        // index register
	this.dt = 0;        // delay timer
	this.st = 0;        // sound timer
	this.hires = false; // are we in SuperChip high res mode?
	this.flags = [];    // semi-persistent hp48 flag vars
	this.plane = 1;     // graphics plane
	this.profile_data = {};

	// control/debug state
	this.keys = {};       // track keys which are pressed
	this.waiting = false; // are we waiting for a keypress?
	this.waitReg = -1;    // destination register of an awaited key
	this.halted = true;
	this.breakpoint = false;
	this.metadata = {};
	this.tickCounter = 0;
	this.linted = false;

	// external interface stubs
	this.exitVector  = function() {}                                                           // fired by 'exit'
	this.importFlags = function() { return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; } // load persistent flags
	this.exportFlags = function(flags) {}                                                      // save persistent flags
	this.buzzTimer   = function(timer) {}
	this.buzzBuffer  = function(buffer) {}
	this.buzzPitch   = function(pitch) {}
	this.buzzVolume  = function(volume) {}
	this.buzzSelect  = function(select) {}
	this.buzzChannel = function(channel) {}

	this.init = function(rom) {
		// initialise memory with a new array to ensure that it is of the right size and is initiliased to 0
		this.m = this.enableXO ? new Uint8Array(0x10000) : new Uint8Array(0x1000);

		this.palette = [...this.defaultPalette];

		// initialize memory
		var font = fontsets[this.fontStyle];
		for(var z = 0, p = this.p; z < 32*64;z++) { p[0][z] = p[1][z] = p[2][z] = p[3][z] = 0; }
		for(var z = 0; z < font.small.length;z++) { this.m[z] = font.small[z]; }
		for(var z = 0; z < font.big.length;  z++) { this.m[z + font.small.length] = font.big[z]; }
		for(var z = 0; z < rom.rom.length;   z++) { this.m[0x200+z] = rom.rom[z]; }
		for(var z = 0; z < 16;               z++) { this.v[z] = 0; }

		// initialize interpreter state
		this.r = [];
		this.pc = 0x200;
		this.i  = 0;
		this.dt = 0;
		this.st = 0;
		this.hires = false;
		this.plane = 1;
		this.drawop = (x,y)=>x^y;

		// initialize control/debug state
		this.keys = {};
		this.waiting = false;
		this.waitReg = -1;
		this.halted = false;
		this.breakpoint = false;
		this.stack_breakpoint = -1;
		this.metadata = rom;
		this.tickCounter = 0;
		this.profile_data = {};
	}

	this.math = function(x, y, op) {
		// basic arithmetic opcodes
		var v = this.v,t;
		switch(op) {
			case 0x0: v[x]  = v[y]; break;
			case 0x1: v[x] |= v[y]; if (this.logicQuirks) v[0xF]=0; break;
			case 0x2: v[x] &= v[y]; if (this.logicQuirks) v[0xF]=0; break;
			case 0x3: v[x] ^= v[y]; if (this.logicQuirks) v[0xF]=0; break;
			case 0x4: v[x] = ( t = v[x]+v[y] ) & 0xFF; v[0xF]=(t> 0xFF)+0; break;
			case 0x5: v[x] = ( t = v[x]-v[y] ) & 0xFF; v[0xF]=(t>=0x00)+0; break;
			case 0x6: if (this.shiftQuirks) { y = x; }
					  v[x] = ( t = v[y] ) >> 1 & 0xFF; v[0xF]=(t& 0x01)+0; break;
			case 0x7: v[x] = ( t = v[y]-v[x] ) & 0xFF; v[0xF]=(t>=0x00)+0; break;
			case 0xC: v[x] = ( t = v[x]*v[y] ) & 0xFF; v[0xF]=(t>>   8)+0; break;
			case 0xD: v[x] = ( t = v[x] )/v[y] & 0xFF; v[0xF]=(t% v[y])+0; break;
				break;
			case 0xE: if (this.shiftQuirks) { y = x; }
					  v[x] = ( t = v[y] ) << 1 & 0xFF; v[0xF]=(t>>   7)+0; break;
			case 0xF: v[x] = v[y]/( t = v[x] ) & 0xFF; v[0xF]=(v[y]% t)+0; break;
			default:
				haltBreakpoint("unknown math opcode "+op.toString(16).toUpperCase());
		}
	}

	this.misc1 = function(x, rest) {
		// miscellaneous opcodes 1
		switch(rest) {
			case 0x9E:
				if (Object.keys(keymap[this.v[x]]||{}).some(x => x in this.keys)) { this.skip(); }
				break;
			case 0xA1:
				if (!Object.keys(keymap[this.v[x]]||{}).some(x => x in this.keys)) { this.skip(); }
				break;
			default:
				haltBreakpoint("unknown misc 1 opcode "+rest.toString(16).toUpperCase());
		}
	}

	this.misc2 = function(x, rest) {
		// miscellaneous opcodes 2
		switch(rest) {
			case 0x01: this.plane = x; break;
			case 0x02:
				var pattern = new Uint8Array(16);
				for(var z = 0; z < 16; z++)
					pattern[z] = this.m[this.i+z];
				this.buzzBuffer(pattern); break;
			case 0x03:
				var R = this.m[this.i  ];
				var G = this.m[this.i+1];
				var B = this.m[this.i+2];
				var RGB = R*65536+G*256+B;
				this.palette[x] = "#"+RGB.toString(16).padStart(6,0);
				break;
			case 0x07: this.v[x] = this.dt; break;
			case 0x0A: this.waiting = true; this.waitReg = x; break;
			case 0x15: this.dt = this.v[x]; break;
			case 0x18: this.buzzTimer(this.st = this.v[x]); break;
			case 0x1E: this.i = (this.i + this.v[x])&0xFFFF; break;
			case 0x29: this.i = ((this.v[x] & 0xF) * 5); break;
			case 0x30: this.i = ((this.v[x] & 0xF) * 10 + fontsets[this.fontStyle].small.length); break;
			case 0x33:
				this.m[this.i]   = Math.floor(this.v[x]/100)%10;
				this.m[this.i+1] = Math.floor(this.v[x]/10)%10;
				this.m[this.i+2] = this.v[x]%10;
				break;
			case 0x3A: this.buzzPitch(this.v[x]); break;
			case 0x3B: this.buzzVolume(this.v[x]); break;
			case 0x3C: this.buzzSelect(x); break;
			case 0x3D: this.buzzChannel(x); break;
			case 0x55:
				for(var z = 0; z <= x; z++) { this.m[this.i+z] = this.v[z]; }
				if (!this.loadStoreQuirks) { this.i = (this.i+x+1)&0xFFFF; }
				break;
			case 0x65:
				for(var z = 0; z <= x; z++) { this.v[z] = this.m[this.i+z]; }
				if (!this.loadStoreQuirks) { this.i = (this.i+x+1)&0xFFFF; }
				break;
			case 0x75:
				for(var z = 0; z <= x; z++) { this.flags[z] = this.v[z]; }
				this.exportFlags(this.flags);
				break;
			case 0x85:
				this.flags = this.importFlags();
				if (typeof this.flags == "undefined" || this.flags == null) {
					this.flags = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				}
				for(var z = 0; z <= x; z++) { this.v[z] = 0xFF & this.flags[z]; }
				break;
			default:
				haltBreakpoint("unknown misc 2 opcode "+rest.toString(16).toUpperCase());
		}
	}

	this.sprite = function sprite(x, y, len) {
		var colSize = this.hires ? 128 : 64;
		var rowSize = this.hires ?  64 : 32;
		var collision = 0;
		var i = this.i;
		for(var layer=0;layer<4;layer++){
			if(this.plane&(1<<layer)){
				var p = this.p[layer];
				var b = y % rowSize;
				for(var h=len?len:16,j=0;j<h;j++,b++){
					var data = this.m[i++]<<8
					if(!len) data |= this.m[i++]
					if(this.clipQuirks)
						if(b>=rowSize) continue;
					var a = x % colSize;
					b %= rowSize;
					while(data){
						if(this.clipQuirks)
							if(a>=colSize) break;
						a %= colSize;
						var k = colSize*b+a++
						var pixel = (data<<=1) >> 16 & 1;
						collision |= pixel & p[k];
						p[k] = this.drawop(pixel,p[k]);
					}
				}
			}
		}
		this.v[0xF] = collision;
	}

	this.call = function(nnn) {
		if (this.r.length >= 12) {
			haltBreakpoint("call stack overflow.");
		}
		this.r.push(this.pc);
		this.pc = nnn
	}

	this.jump0 = function(nnn) {
		if (this.jumpQuirks) { this.pc = nnn + this.v[(nnn >> 8)&0xF];  }
		else                 { this.pc = nnn + this.v[0]; }
	}

	this.machine = function(nnn) {
		if (nnn == 0x00E0) {
			// clear
			for(var layer = 0; layer < 4; layer++) {
				if ((this.plane & (1 << layer)) == 0) { continue; }
				for(var z = 0; z < this.p[layer].length; z++) {
					this.p[layer][z] = 0;
				}
			}
			return;
		}
		if (nnn == 0x00EE) {
			// return
			this.pc = this.r.pop();
			return;
		}
		if ((nnn & 0xFFF0) == 0x00C0) { // scroll down n pixels
			var n = nnn & 0x00F;
			var rowSize = this.hires ? 128 : 64;
			for(var layer = 0; layer < 4; layer++) {
				if ((this.plane & (1 << layer)) == 0) { continue; }
				for(var z = this.p[layer].length - 1; z >= 0; z--) {
					this.p[layer][z] = (z >= rowSize * n) ? this.p[layer][z - (rowSize * n)] : 0;
				}
			}
			return;
		}
		if ((nnn & 0xFFF0) == 0x00D0) { // scroll up n pixels
			var n = nnn & 0x00F;
			var rowSize = this.hires ? 128 : 64;
			for(var layer = 0; layer < 4; layer++) {
				if ((this.plane & (1 << layer)) == 0) { continue; }
				for(var z = 0; z < this.p[layer].length; z++) {
					this.p[layer][z] = (z < (this.p[layer].length - rowSize * n)) ? this.p[layer][z + (rowSize * n)] : 0;
				}
			}
			return;
		}
		if (nnn == 0x00F0) { // invert 
			for(var layer = 0; layer < 4; layer++) {
				if ((this.plane & (1 << layer)) == 0) { continue; }
				for(var z = 0; z < this.p[layer].length; z++)
					this.p[layer][z] ^= 1;
			}
			return;
		}
		if (nnn == 0x00F1) { this.drawop = (x,y)=>x|y; return; } //  OR draw mode
		if (nnn == 0x00F2) { this.drawop = (x,y)=>x&y; return; } // AND draw mode
		if (nnn == 0x00F3) { this.drawop = (x,y)=>x^y; return; } // XOR draw mode

		if (nnn == 0x00FB) { // scroll right 4 pixels
			var rowSize = this.hires ? 128 : 64;
			for(var layer = 0; layer < 4; layer++) {
				if ((this.plane & (1 << layer)) == 0) { continue; }
				for(var a = 0; a < this.p[layer].length; a += rowSize) {
					for(var b = rowSize-1; b >= 0; b--) {
						this.p[layer][a + b] = (b > 3) ? this.p[layer][a + b - 4] : 0;
					}
				}
			}
			return;
		}
		if (nnn == 0x00FC) { // scroll left 4 pixels
			var rowSize = this.hires ? 128 : 64;
			for(var layer = 0; layer < 4; layer++) {
				if ((this.plane & (1 << layer)) == 0) { continue; }
				for(var a = 0; a < this.p[layer].length; a += rowSize) {
					for(var b = 0; b < rowSize; b++) {
						this.p[layer][a + b] = (b < rowSize - 4) ? this.p[layer][a + b + 4] : 0;
					}
				}
			}
			return;
		}
		if (nnn == 0x00FD) { // exit
			this.halted = true;
			this.exitVector();
			return;
		}
		if (nnn == 0x00FE) { // lores
			this.hires = false;
			var lastPlane = this.plane;
			this.plane = 7; this.machine(0x00E0);
			this.plane = lastPlane;
			return;
		}
		if (nnn == 0x00FF) { // hires
			this.hires = true;
			var lastPlane = this.plane;
			this.plane = 7; this.machine(0x00E0);
			this.plane = lastPlane;
			return;
		}
		if (nnn == 0x000) { this.halted = true; return; }
		haltBreakpoint("machine code "+nnn.toString(16).toUpperCase().padStart(4,0)+" is not supported.");
	}

	this.skip = function() {
		var op = (this.m[this.pc  ] << 8) | this.m[this.pc+1];
		this.pc += (op == 0xF000) ? 4 : 2;
	}

	this.opcode = function() {
		// Increment profilining data
		this.profile_data[this.pc] = (this.profile_data[this.pc] || 0) + 1;

		// decode the current opcode
		var op  = (this.m[this.pc  ] << 8) | this.m[this.pc+1];
		var o   = (this.m[this.pc  ] >> 4) & 0x00F;
		var x   = (this.m[this.pc  ]     ) & 0x00F;
		var y   = (this.m[this.pc+1] >> 4) & 0x00F;
		var n   = (this.m[this.pc+1]     ) & 0x00F;
		var nn  = (this.m[this.pc+1]     ) & 0x0FF;
		var nnn = op & 0xFFF;
		this.pc += 2;

		// execute a simple opcode
		
		if (op == 0xF000) {
			// long memory reference
			this.i = ((this.m[this.pc] << 8) | (this.m[this.pc+1])) & 0xFFFF;
			this.pc += 2;
			return;
		}

		if (o == 0x5 && n != 0) {
			if (n == 2) {
				// save range
				var dist = Math.abs(x - y);
				if (x < y) { for(var z = 0; z <= dist; z++) { this.m[this.i+z] = this.v[x+z]; }}
				else       { for(var z = 0; z <= dist; z++) { this.m[this.i+z] = this.v[x-z]; }}
				return;
			}
			else if (n == 3) {
				// load range
				var dist = Math.abs(x - y);
				if (x < y) { for(var z = 0; z <= dist; z++) { this.v[x+z] = this.m[this.i+z]; }}
				else       { for(var z = 0; z <= dist; z++) { this.v[x-z] = this.m[this.i+z]; }}
				return;
			}
			else {
				haltBreakpoint("unknown opcode "+op.toString(16).toUpperCase());
			}
		}
		if (o == 0x9 && n != 0) {
			haltBreakpoint("unknown opcode "+op.toString(16).toUpperCase());
		}

		// dispatch complex opcodes
		switch(o) {
			case 0x0: this.machine(nnn);                            break;
			case 0x1: this.pc = nnn;                                break;
			case 0x2: this.call(nnn);                               break;
			case 0x3: if (this.v[x] == nn)        { this.skip(); }  break;
			case 0x4: if (this.v[x] != nn)        { this.skip(); }  break;
			case 0x5: if (this.v[x] == this.v[y]) { this.skip(); }  break;
			case 0x6: this.v[x] = nn;                               break;
			case 0x7: this.v[x] = (this.v[x] + nn) & 0xFF;          break;
			case 0x8: this.math(x, y, n);                           break;
			case 0x9: if (this.v[x] != this.v[y]) { this.skip(); }  break;
			case 0xA: this.i = nnn;                                 break;
			case 0xB: this.jump0(nnn);                              break;
			case 0xC: this.v[x] = (Math.random()*256)&nn;           break;
			case 0xD: this.sprite(this.v[x], this.v[y], n);         break;
			case 0xE: this.misc1(x, nn);                            break;
			case 0xF: this.misc2(x, nn);                            break;
			default: haltBreakpoint("unknown opcode "+o.toString(16).toUpperCase());
		}
	}

	this.tick = function() {
		if (this.halted) { return; }
		this.tickCounter++;
		//try {
			this.opcode();
		//}
		//catch(err) {
 		//	console.log("halted: " + err);
		//	this.halted = true;
		//}
	}
}
