<template>
    <div>
        <h5 class="title">{{ title }}</h5>
        <nav>
            <ul>
                <li v-for="item in items">
                    <thumbnail-item :def-caption="item.caption" :def-source="'images/covers/' + item.source"></thumbnail-item>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
    import thumbnailItem from './thumbnail-item.vue';

	export default {
		props: ['defTitle'],
        components: {
			'thumbnail-item': thumbnailItem
        },
		data() {
			return {
				title: this.defTitle,
				items: []
			};
		}
	}
</script>