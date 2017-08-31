/**
 * Created by ralphy on 30/08/17.
 */
const assert = require('assert');
const vr = require('../models/vidfiles');

describe('videoRepository', function() {
	describe('#test1', function() {
		it('should be ok because vidfiles.js exists', function() {
			assert.ok(vr);
		});
	});

	describe('#setVidFiles', function() {
		it('should insert 2 files', function() {
			vr.clear();
			vr.setVidFiles([
				{file: 'test1.webm', path: 'x' },
				{file: 'test2.webm', path: 'x' },
			]);
			let aFiles = vr.getVidFiles();
			assert.equal(aFiles.length, 2);
			// test names
			assert.equal(aFiles[0].file, 'test1.webm');
			assert.equal(aFiles[1].file, 'test2.webm');
			// test id
			assert.equal(aFiles[0].id, '1');
			assert.equal(aFiles[1].id, '2');
		});
	});

	describe('#getById', function() {
		it('should create 20 files and return a good result of query index', function() {
			vr.clear();
			let a = [];
			for (let i = 0; i < 100; ++i) {
				a.push({file: 'test-' + (Math.random() * 100000).toString(16), path: 'xx/d' + (Math.random() * 10 | 0)});
			}
			vr.setVidFiles(a);
			let aFiles = vr.getVidFiles();
			assert.equal(aFiles[8].id, 9);
		});
	})
});