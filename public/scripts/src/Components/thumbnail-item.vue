<template>
    <figure class="thumbnail">
        <img v-bind:src="source" />
        <figcaption>{{ caption }}</figcaption>
    </figure>
</template>
<script>
    export default {
    	props: ['defCaption', 'defSource'],
        data: function() {
    		return {
    			source: this.defSource,
                caption: this.defCaption
            };
        }
    }
</script>
<style scoped="scoped">
    figure.thumbnail img {
        height: 10em;
        width: initial;
    }

    figure.thumbnail figcaption {
        font-size: 0.75em;
    }

    figure.thumbnail {
        margin: 0 0.1em;
        text-align: center;
        width: 10em;
        border: solid thin rgba(0, 0, 0, 0.4);
        box-shadow: 0.1em 0.1em 0.2em rgba(0, 0, 0, 0.25);
        background-color: #c0c0c0;
    }

    figure:hover {
        transition: filter 0.5s;
        filter: brightness(125%);
    }
</style>