<template>
    <i v-bind:class="'mdi mdi-' + defIcon"></i>
</template>
<script>
	export default {
		props: ['defIcon'],
		data: function() {
			return {
                icon: this.defIcon
			};
		}
	};
</script>
