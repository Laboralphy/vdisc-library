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

	describe('#parseSSV()', function() {
		it('should parse a simplest line', function () {
			let f = new F2DA();
			let r = f.parseSSV('0 abc');
			assert.ok(Array.isArray(r));
			assert.equal(2, r.length);
			assert.equal('abc', r[1]);
			assert.equal(0, r[0]);
		});

		it('should parse a line with quotes', function () {
			let f = new F2DA();
			let r = f.parseSSV('0 abc "raph marr" "4 5 6" abcdef 1.3');
			assert.ok(Array.isArray(r));
			assert.equal(6, r.length);
			assert.deepEqual(['0',  'abc', 'raph marr', '4 5 6', 'abcdef', '1.3'], r);
		});

		it('should parse a line with quotes and **** value', function () {
			let f = new F2DA();
			let r = f.parseSSV('0 **** abc "raph marr" "4 5 6" **** **** abcdef 1.3');
			assert.ok(Array.isArray(r));
			assert.equal(9, r.length);
			assert.deepEqual(['0', null, 'abc', 'raph marr', '4 5 6', null, null, 'abcdef', '1.3'], r);
		});
	});

	describe('#parseDefault()', function() {
		it ('should return empty string', function() {
			let f = new F2DA();
			assert.strictEqual('', f.parseDefault(''));
		});
		it ('should return default value', function() {
			let f = new F2DA();
			assert.strictEqual('toto', f.parseDefault('default: toto'));
		});
		it ('should throw an error', function() {
			let f = new F2DA();
			assert.throws(function() {
				f.parseDefault('xxx');
			});
		});
	});

	describe('#parseVersion()', function() {
		it ('should return a version number', function() {
			let f = new F2DA();
			assert.strictEqual('2.0', f.parseVersion('2DA V2.0'));
		});
		it ('should throw an error', function() {
			let f = new F2DA();
			assert.throws(function() {
				f.parseVersion('2DAxxxxx');
			});
		});
	});

	describe('#checkColCount()', function() {
		it ('should work', function() {
			let f = new F2DA();
			assert.doesNotThrow(function() {
				f.checkColCount(['abc', 'def', 'ghi'], [
					['yui', 'xvc', 'poi'],
					['yui', 'xvc', 'poi'],
					['yui', 'xvc', 'poi'],
					['yui', 'xvc', 'poi'],
					['yui', 'xvc', 'poi'],
					['yui', 'xvc', 'poi'],
					['yui', 'xvc', 'poi'],
					['yui', 'xvc', 'poi'],
					['yui', 'xvc', 'poi'],
					['yui', 'xvc', 'poi']
				]);
			});
		});
		it ('should work with initial numeric column', function() {
			let f = new F2DA();
			assert.doesNotThrow(function() {
				f.checkColCount(['abc', 'def', 'ghi'], [
					[0, 'yui', 'xvc', 'poi'],
					[1, 'yui', 'xvc', 'poi'],
					[2, 'yui', 'xvc', 'poi'],
					[3, 'yui', 'xvc', 'poi'],
					[4, 'yui', 'xvc', 'poi'],
					[5, 'yui', 'xvc', 'poi'],
					[6, 'yui', 'xvc', 'poi'],
					[7, 'yui', 'xvc', 'poi'],
					[8, 'yui', 'xvc', 'poi'],
					[9, 'yui', 'xvc', 'poi']
				]);
			});
		});
		it ('should not work because initial numeric column is incoherent', function() {
			let f = new F2DA();
			assert.throws(function() {
				f.checkColCount(['abc', 'def', 'ghi'], [
					[0, 'yui', 'xvc', 'poi'],
					[1, 'yui', 'xvc', 'poi'],
					[2, 'yui', 'xvc', 'poi'],
					[7, 'yui', 'xvc', 'poi'],
					[4, 'yui', 'xvc', 'poi'],
					[5, 'yui', 'xvc', 'poi'],
					[6, 'yui', 'xvc', 'poi'],
					[7, 'yui', 'xvc', 'poi'],
					[8, 'yui', 'xvc', 'poi'],
					[9, 'yui', 'xvc', 'poi']
				]);
			});
		});
	});

	describe('#buildTable()', function() {
		it('should build a simple table', function() {
			let f = new F2DA();
			let aTable = f.buildTable(['name', 'age', 'class', 'rank'], [
				['puri puri prisoner', 33, 's', 17],
				['genos', 19, 's', 14],
				['watch dog man', '****', 's', 12],
				['king', 29, 's', 6],
				['metal knight', '****', 's', 7],
				['silver fang', 81, 's', 3],
				['tatsumaki', 28, 's', 2]
			]);
			assert.deepEqual({
				name: 'puri puri prisoner',
				age: 33,
				'class': 's',
				rank: 17
			}, aTable[0]);
			assert.deepEqual({
				name: 'tatsumaki',
				age: 28,
				'class': 's',
				rank: 2
			}, aTable[6]);
		});
	});

	describe('#parseSource()', function() {
		it ('should parse a simple table with numeric indices', function() {
			let f = new F2DA();
			let aTable = f.parse(
`2DA V2.0

	name					age		class	rank
0	"puri puri prisoner"	33		s		17
1	genos					19		s		14
2	"watch dog man"			****	s		12
3	king					29		s		6
4	"metal knight"			****	s		7
5	"silver fang"			81		s		3
6	tatsumaki				28		s		2
7	blast					****	s		1
`);
			assert.deepEqual({
				name: 'puri puri prisoner',
				age: 33,
				'class': 's',
				rank: 17
			}, aTable[0]);
			assert.deepEqual({
				name: 'tatsumaki',
				age: 28,
				'class': 's',
				rank: 2
			}, aTable[6]);
		});
		it ('should parse a simple table without numeric indices', function() {
			let f = new F2DA();
			let aTable = f.parse(
`2DA V2.0

name					age		class	rank
"puri puri prisoner"	33		s		17
genos					19		s		14
"watch dog man"			****	s		12
king					29		s		6
"metal knight"			****	s		7
"silver fang"			81		s		3
tatsumaki				28		s		2
blast					****	s		1
`);
			assert.deepEqual({
				name: 'genos',
				age: 19,
				'class': 's',
				rank: 14
			}, aTable[1]);
			assert.deepEqual({
				name: 'tatsumaki',
				age: 28,
				'class': 's',
				rank: 2
			}, aTable[6]);
		});
	});
});



