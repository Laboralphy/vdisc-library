/**
 * Created by ralphy on 06/11/17.
 */

import searchTool from '../libs/search-tool/index.js';
import * as types from './mutation-types';

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
	[types.ADD_VIDEO] (state, {
		id,
		filename,
		idshow,
		episode
	}) {
		let oShow = state.shows.find(s => s.id === idshow);
		if (!oShow) {
			throw new Error('could add video to show #' + idshow + ' because this show does not exist.');
		}
		// vérifier si l'identifiant existe déja
		if (!state.videos.find(v => v.id === id)) {
			state.videos.push({
				id,
				filename,
				idshow,
				episode
			});
		}
	},

	/**
	 * Ajout un show à la base de données.
	 * @param state
	 * @param id
	 * @param name
	 */
	[types.ADD_SHOW] (state, {
		id,
		name
	}) {
		if (!state.shows.find(s => s.id === id)) {
			state.shows.push({
				id,
				name
			});
		}
	},

	/**
	 * Affiche les video correspondant au mieux à la chaine recherchée
	 * @param state
	 * @param sSearch
	 * @returns {Array.<T>}
	 */
	searchShows(state, sSearch) {
		function cmp(s1, s2) {
			if (s1 < s2) {
				return -1;
			} else if (s1 > s2) {
				return 1;
			} else {
				return 0;
			}
		}

		state
			.shows.forEach(s => s.pert = searchTool.pertinence(s.name, sSearch));

		state.searchResults = state
			.shows
			.slice(0)
			.sort((v1, v2) =>
				cmp(
					searchTool.pertinence(v1.name, sSearch),
					searchTool.pertinence(v2.name, sSearch)
				)
			);
	},
};