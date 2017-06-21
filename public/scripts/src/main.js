/**
 * Created by ralphy on 20/05/17.
 */

import titleBar from './Components/title-bar.vue';
import menuBar from './Components/menu-bar.vue';
import thumbnailItem from './Components/thumbnail-item.vue';
import thumbnailList from './Components/thumbnail-list.vue';
import sectionCard from './Components/section-card.vue';

function main () {

    const app = new Vue({
        el: '#application',
        components: {
			'title-bar': titleBar,
			'menu-bar': menuBar,
			'thumbnail-item': thumbnailItem,
			'thumbnail-list': thumbnailList,
			'section-card': sectionCard
		},
		data: function() {
        	return {
        		sections: {
				}
			}

		}
    });

    window.Application = app;

}

window.addEventListener('load', main);