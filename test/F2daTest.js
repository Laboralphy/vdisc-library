/**
 * Created by ralphy on 22/06/17.
 */
const assert = require('assert');
const F2DA = require('../helpers/f2da');


describe('F2DA', function() {
	describe('#new', function() {
		it('should be instanciated', function() {
			assert.ok(new F2DA());
		});
	});

	describe('#parseDataLine()', function() {
		it('should parse a simplest line', function() {
			let f = new F2DA();
			let r = f.parseDataLine('0 abc');
			assert.ok(Array.isArray(r));
			assert.equal(1, r.length);
			assert.equal('abc', r[0]);
		});

		it('should parse a difficulty-class 2 line', function() {
			let f = new F2DA();
			let r = f.parseDataLine('0 abc "xyz"');
			assert.ok(Array.isArray(r));
			assert.equal(2, r.length);
			assert.equal('abc', r[0]);
			assert.equal('xyz', r[1]);
		});

		it('should parse a difficulty-class 3 line', function() {
			let f = new F2DA();
			let r = f.parseDataLine('0 abc "xyz" 456');
			assert.ok(Array.isArray(r));
			assert.equal(3, r.length);
			assert.equal('abc', r[0]);
			assert.equal('xyz', r[1]);
			assert.equal(456, r[2]);
		});

		it('should parse a line with lots of items and spaces', function() {
			let f = new F2DA();
			let r = f.parseDataLine('0			shiva		ifrit 		bahamut ixion ramuh "les sœurs magus" 120');
			assert.ok(Array.isArray(r));
			assert.equal(7, r.length);
			assert.equal('shiva', r[0]);
			assert.equal('ifrit', r[1]);
			assert.equal('bahamut', r[2]);
			assert.equal('ixion', r[3]);
			assert.equal('ramuh', r[4]);
			assert.equal('les sœurs magus', r[5]);
		});

		it('should parse a line with null values', function() {
			let f = new F2DA();
			let r = f.parseDataLine('0			shiva		**** 		bahamut ixion **** "les sœurs magus" 120');
			assert.ok(Array.isArray(r));
			assert.equal(7, r.length);
			assert.equal('shiva', r[0]);
			assert.strictEqual(null, r[1]);
			assert.equal('bahamut', r[2]);
			assert.equal('ixion', r[3]);
			assert.strictEqual(null, r[4]);
			assert.equal('les sœurs magus', r[5]);
			assert.equal(120, r[6]);
		});

		it ('should produce an array with 2 entries', function() {
			let f = new F2DA();
			f.parseDataLine('0			shiva		ifrit 		bahamut ixion ramuh "les sœurs magus" 120');
			f.parseDataLine('1		karbunkle		atomos 		titan alexandre ondine leviathan 1');
			assert.equal(2, f._data.length);
			assert.equal(7, f._data[0].length);
			assert.equal(7, f._data[1].length);
			assert.equal('karbunkle', f._data[1][0]);
		});
	});

	describe('#parseFieldList()', function() {
		it ('should parse 3 fields, bobo, bibi, bubu', function() {
			let f = new F2DA();
			let a = f.parseFieldList('   bobo    bibi  		bubu');
			assert.ok(Array.isArray(a));
			assert.equal(3, a.length);
			assert.equal('bobo', a[0]);
			assert.equal('bibi', a[1]);
			assert.equal('bubu', a[2]);
		});
	});

	describe('#parseVersion()', function() {
		it ('should parse version', function() {
			let f = new F2DA();
			f.parseVersion('2DA V2.0');
			assert.equal('2.0', f._version);
		});
	});


	describe('#getState()', function() {
		it('should return accurate state', function () {
			let f = new F2DA();
			assert.equal('version', f.getState());
			f._version = '2.0';
			assert.equal('fieldlist', f.getState());
			f._fields = ['a', 'b', 'c'];
			assert.equal('data', f.getState());
		});
	});

	describe('#parseLine()', function() {
		it('should return accurate state', function () {
			let f = new F2DA();
			assert.equal('version', f.getState());
			f.parseLine('2DA V2.0');
			assert.equal('2.0', f._version);
			assert.equal('fieldlist', f.getState());
			f.parseLine(' a b c');
			assert.deepEqual(['a', 'b', 'c'], f._fields);
			assert.equal('data', f.getState());
		});
	});

	describe('#parse()', function() {
		it('should parse', function() {
			let sSource = `2DA V2.0


	name		type		pow
	-----		-----		-----

0	ifrit		fire		100
1	ramuh		electricity 120
2	shiva		ice			80
3	bahamut		neutre		150
`;
			let f = new F2DA();
			f.parse(sSource);
			assert.equal('2.0', f._version);
			assert.deepEqual(['name', 'type', 'pow'], f._fields);
			assert.deepEqual(['ifrit', 'fire', 100], f._data[0]);
			assert.deepEqual(['ramuh', 'electricity', 120], f._data[1]);
			assert.deepEqual(['shiva', 'ice', 80], f._data[2]);
			assert.deepEqual(['bahamut', 'neutre', 150], f._data[3]);
		});
	});

	describe('#parse() 2', function() {
		it('should parse a real file and build a json', function() {
			let sSource = `2DA V2.0

	file										type			quality		audio		subtitles		n
	-----------------------------------------	--------------	----------	----------	-------------	-----
0	d1/paranoia-agent.d1.t1.vfr.qh.webm			episode			h			fr			****			1
1	d1/paranoia-agent.d1.t2.vfr.qh.webm			episode			h			fr			****			2
2	d1/paranoia-agent.d1.t3.vfr.qh.webm			episode			h			fr			****			3
3	d1/paranoia-agent.d1.t4.vfr.qh.webm			episode			h			fr			****			4`;
			let f = new F2DA();
			f.parse(sSource);
			assert.deepEqual({file: 'd1/paranoia-agent.d1.t1.vfr.qh.webm', type: 'episode', quality: 'h', audio: 'fr', subtitles: null, n: 1}, f._json[0]);
			assert.deepEqual({file: 'd1/paranoia-agent.d1.t2.vfr.qh.webm', type: 'episode', quality: 'h', audio: 'fr', subtitles: null, n: 2}, f._json[1]);
			assert.deepEqual({file: 'd1/paranoia-agent.d1.t3.vfr.qh.webm', type: 'episode', quality: 'h', audio: 'fr', subtitles: null, n: 3}, f._json[2]);
			assert.deepEqual({file: 'd1/paranoia-agent.d1.t4.vfr.qh.webm', type: 'episode', quality: 'h', audio: 'fr', subtitles: null, n: 4}, f._json[3]);
		});
	})

});



