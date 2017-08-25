<template>
    <h3 :class="['title', color]">{{ caption }}</h3>
</template>
<script>
	export default {
		props: ['defColor', 'defCaption'],
		data: function() {
			return {
				color: this.defColor,
				caption: this.defCaption
			};
		}
	};

</script>
<style scoped="scoped">

.title.blue {
    background-color: rgba(0, 0, 128, 0.75);
    border: solid thin rgb(0, 0, 96);
    color: #DDDDFF;
    text-shadow: 0 0 0.2em rgba(128, 128, 255, 1), 0.15em 0.15em 0.25em rgba(0, 0, 255, 1);
}

.title.purple {
    background-color: rgba(128, 0, 128, 0.75);
    border: solid thin rgb(96, 0, 96);
    color: #FFDDFF;
    text-shadow: 0 0 0.2em rgba(255, 128, 255, 1), 0.15em 0.15em 0.25em rgba(255, 0, 255, 1);
}

.title.red {
    background-color: rgba(128, 0, 0, 0.75);
    border: solid thin rgb(96, 0, 0);
    color: #FFDDDD;
    text-shadow: 0 0 0.2em rgba(255, 128, 128, 1), 0.15em 0.15em 0.25em rgba(255, 0, 0, 1);
}

.title.green {
    background-color: rgba(0, 128, 0, 0.75);
    border: solid thin rgb(0, 96, 0);
    color: #DDFFDD;
    text-shadow: 0 0 0.2em rgba(128, 255, 128, 1), 0.15em 0.15em 0.25em rgba(0, 255, 0, 1);
}

</style>