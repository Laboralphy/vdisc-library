/**
 * Created by ralphy on 06/11/17.
 */

import searchTool from '../libs/search-tool/index.js';

export default {
	/**
	 * ajoute une video à la liste des videos
	 * @param state
	 * @param id {number} identifiant de la video
	 * @param filename {string} nom du fichier (avec chemin)
	 * @param idshow {number} identifiant du show
	 * @param season {number} numero de saison
	 * @param episode {number} numero de l'épisode
	 * @param title {string} titre de l'épisode
	 */
	addVideo(state, {
		id,
		filename,
		idshow,
		season = 1,
		episode,
		title = ''
	}) {
		let oShow = state.shows.find(s => s.id === idshow);
		if (!oShow) {
			throw new Error('could add video to show #' + idshow + ' because this show does not exist.');
		}
		let oVideo = {
			id,
			filename,
			idshow,
			season,
			episode,
			search: oShow.name + ' s' + season + ' e' + episode + ' ' + title,
			title
		};
		// vérifier si l'identifiant existe déja
		if (state.videos.every(v => v.id !== id)) {
			state.videos.push(oVideo);
		}
	},

	/**
	 * Renvoie les données relatives à une video
	 * @param state
	 * @param id {number} identifiant video recherchée
	 * @returns {*}
	 */
	getVideo(state, id) {
		return state.videos.find(v => v.id === id);
	},

	/**
	 * Renvoie les video coorespondant au mieux à la chaine recherchée
	 * @param state
	 * @param sSearch
	 * @returns {Array.<T>}
	 */
	searchVideos(state, sSearch) {
		function cmp(s1, s2) {
			if (s1 < s2) {
				return -1;
			} else if (s2 > s1) {
				return 1;
			} else {
				return 0;
			}
		}
		return state
			.videos
			.slice(0)
			.sort((v1, v2) =>
				cmp(
					searchTool.pertinence(v1.search, sSearch),
					searchTool.pertinence(v2.search, sSearch)
				)
			);
	}
};