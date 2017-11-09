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
				episode: iEp,
			});
			mutations.addVideo(state, {
				id: ++id,
				filename: 'DN-e0' + iEp + '.mkv',
				idshow: 2,
				episode: iEp,
			});
			mutations.addVideo(state, {
				id: ++id,
				filename: 'Haruhi-e0' + iEp + '.mkv',
				idshow: 3,
				episode: iEp,
			});
			mutations.addVideo(state, {
				id: ++id,
				filename: 'K12-e0' + iEp + '.mkv',
				idshow: 4,
				episode: iEp,
			});
		}
		it('should have 40 videos', function() {
			expect(state.videos.length).toBe(40);
		});
		it('should show videos of haruhi first', function() {
            let aResults = mutations.searchShows(state, 'haruhi');
            expect(aResults[0].idshow).toBe(3);

            aResults = mutations.searchShows(state, 'haruhi suzumiya');
			expect(aResults[0].idshow).toBe(3);
        });

        it('should show videos of code geass first', function() {
            let aResults = mutations.searchShows(state, 'lelouch');
            expect(aResults[0].idshow).toBe(1);
        });

        it('should show videos of death note first', function() {
            let aResults = mutations.searchShows(state, 'death');
            expect(aResults[0].idshow).toBe(2);
        });
	});
});