<template>
    <div>
        <h4 class="title">{{ title }}</h4>
        <nav>
            <ul>
                <li v-for="item in items">
                    <vue-thumbnail-item :key="item.id" v-on:item-select="selectHandler(item)" :def-caption="item.caption" :def-source="item.source" :def-id="item.id"></vue-thumbnail-item>
                </li>
                <p class="no-item" v-if="items.length == 0"><vue-icon def-icon="magnify"></vue-icon> Pas d'élément.</p>
            </ul>
        </nav>
    </div>
</template>
<script>
	import vueThumbnailItem from './thumbnail-item.vue';
	import vueIcon from './icon.vue';
	export default {
		props: ['defTitle'],
        components: {
			'vue-thumbnail-item': vueThumbnailItem,
			'vue-icon': vueIcon
		},
		data: function() {
			return {
				title: this.defTitle,
				items: []
			};
		},
        methods: {
			selectHandler: function(item) {
				this.$emit('select', item);
            },

            addItem: function(id, sCaption, sSource) {
                this.items.push({
                    id: id,
                    caption: sCaption,
                    source: sSource
                })
            }
        }
	}
</script>
<style scoped="scoped">
    p.no-item {
        color: rgb(128, 128, 128);
        font-style: italic;
    }
</style>