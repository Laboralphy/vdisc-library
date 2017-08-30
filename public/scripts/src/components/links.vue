<template>
    <nav>
        <ul>
            <li v-for="item in items">
                <button v-on:click="clickHandler(item)" type="button"><vue-icon v-if="item.icon" :def-icon="item.icon"></vue-icon> {{ item.caption }}</button>
            </li>
        </ul>
    </nav>
</template>
<script>
	import vueIcon from './icon.vue';
    export default {
		props: {
			'defItems': {
				type: Array
			}
		},
        data: function() {
			return {
				items: this.defItems.map(function(i, id) {
					let oOutput = {
						caption: '',
                        icon: '',
                        id: ''
                    };
					if (typeof i === 'object') {
						oOutput.caption = i.caption || '';
						oOutput.icon = i.icon || '';
						oOutput.id = i.id || ('id-' + id);
                    } else {
						oOutput.caption = i;
						oOutput.icon = '';
						oOutput.id = 'id-' + id;
                    }
					return oOutput;
                })
			};
		},
        methods: {
			clickHandler: function(item) {
				this.$emit('select', item);
            }
        },
        components: {
			'vue-icon': vueIcon
        }
	};
</script>
