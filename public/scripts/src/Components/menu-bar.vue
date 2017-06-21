<template>
    <nav>
        <ul>
            <li v-for="item in items">
                <button v-on:click="" type="button"><span v-if="item.icon" :class="'icon-' + item.icon">&nbsp;</span> {{ item.caption }}</button>
            </li>
        </ul>
    </nav>
</template>
<script>
    export default {
		props: {
			'defItems': {
				type: Array,
			},
		},
        data: function() {
			return {
				items: this.defItems.map(function(i) {
					let oOutput = {
						caption: '',
                        icon: '',
                    };
					if (typeof i === 'object') {
						oOutput.caption = i.caption || '';
						oOutput.icon = i.icon || '';
                    } else {
						oOutput.caption = i;
						oOutput.icon = '';
                    }
					return oOutput;
                })
			};
		}
	};
</script>
