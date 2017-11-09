/**
 * Created by ralphy on 20/05/17.
 */

//import Vue from './externals/Vue/vue.js';

import vueTitle from './components/title.vue';
import vueIcon from './components/icon.vue';
import vueLinks from './components/links.vue';
import vueThumbnailItem from './components/thumbnail-item.vue';
import vueThumbnailList from './components/thumbnail-list.vue';
import vueCard from './components/card.vue';
import vueFormSearch from './components/form-search.vue';


// store
import store from './store/index.js';

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

				/*axios
					.get('/search/p/' + req.replace(/[^a-z0-9]+/gi, '-'))
					.then(res => {
						this.assignArray(this.$refs.searchForm.list, res.data);
					});*/
			},

			searchFormSearch: function(req) {
				/*
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
				});*/
			},




        	init: function() {
				let $refs = this.$refs;
        		$refs.mainMenu.$on('select', this.mainMenuClick.bind(this));
				$refs.searchForm.$on('suggest', this.searchFormSuggest.bind(this));
				$refs.searchForm.$on('search', this.searchFormSearch.bind(this));
				$refs.videoBrowser.$on('select', function(item) {
					console.log('MAIN click on', item);
				});
			}
		}
    });

    window.Application = app;
    app.init();

}

window.addEventListener('load', main);