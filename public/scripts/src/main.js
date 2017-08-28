/**
 * Created by ralphy on 20/05/17.
 */

//import Vue from './externals/Vue/vue.js';

import vueTitle from './Components/title.vue';
import vueIcon from './Components/icon.vue';
import vueLinks from './Components/links.vue';
import vueThumbnailItem from './Components/thumbnail-item.vue';
import vueThumbnailList from './Components/thumbnail-list.vue';
import vueCard from './Components/card.vue';
import vueFormSearch from './Components/form-search.vue';

function main () {

    const app = new Vue({
        el: '#application',
        components: {
			'vue-title': vueTitle,
			'vue-icon': vueIcon,
			'vue-links': vueLinks,
			'vue-thumbnail-item': vueThumbnailItem,
			'vue-thumbnail-list': vueThumbnailList,
			'vue-card': vueCard,
			'vue-form-search': vueFormSearch
		},
		methods: {

			////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS //////
			////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS //////
			////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS ////// EVENTS //////

			/**
			 * When one clicks on a main menu option
			 * @param item
			 */
			mainMenuClick: function(item) {
				console.log('clicked on xxx', item.id);
			},

			/**
			 * When a suggestion is made from the search form
			 * @param req
			 */
			searchFormSuggest: function(req) {
				axios
					.get('/search/p/' + req.replace(/[^a-z0-9]+/gi, '-'))
					.then(res => {
						this.assignArray(this.$refs.searchForm.list, res.data);
					});
			},

			searchFormSearch: function(req) {
				axios.get('/search/s/' + req.replace(/[^a-z0-9]+/gi, '-')).then(res => {
					let $vb = this.$refs.videoBrowser;
					$vb.title = 'Résultats pour : ' + req;
					this.assignArray($vb.items, res.data.map(v => {
						return {
							id: v.id,
							caption: v.file.split('.').slice(0, 3).join(' '),
							source: '/thumbnails/default.jpg'
						};
					}));
				});
			},








			/**
			 * Assigns an array to a Component array, according to Vue array manipulation restrictions
			 * @param aArray {Array} component array
			 * @param aData {Array} array
			 */
			assignArray: function(aArray, aData) {
				aArray.splice(0, aArray.length);
				aData.forEach(x => aArray.push(x));
			},

        	init: function() {
				let self = this;
        		let $refs = this.$refs;

        		$refs.mainMenu.onClick = this.mainMenuClick.bind(this);
				$refs.searchForm.onSuggest = this.searchFormSuggest.bind(this);
				$refs.searchForm.onSearch = this.searchFormSearch.bind(this);

				$refs.videoBrowser.onSelect = function(item) {
					console.log('MAIN click on', item);
				};
			}
		}
    });

    window.Application = app;
    app.init();

}

window.addEventListener('load', main);