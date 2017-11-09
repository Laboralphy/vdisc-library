<template>
    <figure v-on:click="clickHandler" class="thumbnail">
        <img v-bind:src="source" />
        <figcaption><p>{{ caption }}</p></figcaption>
    </figure>
</template>
<script>
    export default {
    	props: ['defCaption', 'defSource', 'defId'],
        data: function() {
    		return {
    			id: this.defId,
    			source: this.defSource,
                caption: this.defCaption
            };
        },
        methods: {
    		clickHandler: function() {
				this.$emit('item-select', {id: this.id});
            }
        }
    }
</script>
<style scoped="scoped">
    figure.thumbnail img {
        max-height: 14em;
        max-width: 10em;
    }

    figure.thumbnail figcaption {
        font-size: 0.75em;
    }

    figure.thumbnail {
        margin: 0.15em 0.15em;
        text-align: center;
        width: 12em;
        border: solid thin rgba(0, 0, 0, 0.4);
        box-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.25);
        background-color: #c0c0c0;
    }

    figure:hover {
        transition: filter 0.5s;
        filter: brightness(115%);
    }

    figure figcaption {
        height: 4em;
    }
</style>