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

        	mainMenuClick: function(item) {
				console.log('clicked on xxx', item.id);
			},

        	init: function() {
        		let $refs = this.$refs;

        		$refs.mainMenu.onClick = this.mainMenuClick.bind(this);

				$refs.searchForm.onSuggest = function(req) {
					axios.get('/search/p/' + req.replace(/[^a-z0-9]+/gi, '-'))
						.then(data => this.$set($refs.searchForm.list, data));
				};

				$refs.searchForm.onSearch = function(req) {
					axios.get('/search/s/' + req.replace(/[^a-z0-9]+/gi, '-')).then(res => {
						let $vb = $refs.videoBrowser;
						$vb.title = 'Résultats pour : ' + req;
						this.$set($vb.items, res.data.map(v => {
							return {
								id: v.id,
								caption: v.file.split('.').slice(0, 3).join(' '),
								source: '/thumbnails/default.jpg'
							};
						}));
					});
				};

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