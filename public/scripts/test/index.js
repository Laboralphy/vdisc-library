/**
 * Created by ralphy on 06/11/17.
 */

import mutations from '../src/store/mutations.js';
import searchTool from '../src/libs/search-tool/index.js';


describe('#search-tool', function() {
	describe('#levenshtein', function() {
		it('should return 0, because it is the same word', function() {
			expect(searchTool.levenshtein('string', 'string')).toBe(0);
		});
		it('should return 1, because there is only one difference (addition)', function() {
			expect(searchTool.levenshtein('string', 'stringa')).toBe(1);
		});
	});
	describe('#digest', function() {
		it('should return "alpha beta delta gamma"', function() {
			expect(searchTool.digest('DELta Gamma Alpha Beta')).toBe('alpha beta delta gamma');
		});
	});
});

describe('#mutations', function() {
	describe('#addVideo', function() {
		let state = {
			shows: [
				{
					id: 1,
					name: 'Code Geass - Lelouch of the Rebellion'
				},
				{
					id: 2,
					name: 'Death Note'
				},
				{
					id: 3,
					name: 'La mélancolie d\'Haruhi Suzumiya'
				},
				{
					id: 4,
					name: 'Les 12 royaumes'
				}
			],
			videos: []
		};
		let id = 0;
		for (let iEp = 0; iEp < 10; ++iEp) {
			mutations.addVideo(state, {
				id: ++id,
				filename: 'CG-s1e0' + iEp + '.mkv',
				idshow: 1,
				season: 1,
				episode: iEp,
			});
			mutations.addVideo(state, {
				id: ++id,
				filename: 'DN-e0' + iEp + '.mkv',
				idshow: 2,
				season: 1,
				episode: iEp,
			});
			mutations.addVideo(state, {
				id: ++id,
				filename: 'Haruhi-e0' + iEp + '.mkv',
				idshow: 3,
				season: 1,
				episode: iEp,
			});
			mutations.addVideo(state, {
				id: ++id,
				filename: 'K12-e0' + iEp + '.mkv',
				idshow: 4,
				season: 1,
				episode: iEp,
			});
		}
		it('should have 40 videos', function() {
			expect(state.videos.length).toBe(40);
		});
		it('should show videos of haruhi first', function() {
			let aResults = mutations.searchVideos(state, 'haruhi');
			let sDigHaruhi = searchTool.digest('La mélancolie d\'Haruhi Suzumiya');
			let sDigCodeGeass = searchTool.digest('Code Geass - Lelouch of the Rebellion');
			let sDigDeathNote = searchTool.digest('Death Note');
			let s12Royaumes = searchTool.digest('Les 12 royaumes');
			let sSearch = searchTool.digest('haruhi');
			console.log(sDigHaruhi, sSearch, searchTool.levenshtein(sDigHaruhi, sSearch));
			console.log(sDigDeathNote, sSearch, searchTool.levenshtein(sDigDeathNote, sSearch));
			console.log(sDigCodeGeass, sSearch, searchTool.levenshtein(sDigCodeGeass, sSearch));
			console.log(s12Royaumes, sSearch, searchTool.levenshtein(s12Royaumes, sSearch));
			expect(aResults[0].idshow).toBe(4);
		})
	});
});