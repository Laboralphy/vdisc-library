<template>
    <form v-on:submit="submitHandler">
        <input :list="id + '-list'" v-model="search" v-on:input="inputHandler" name="search" type="text" placeholder="Rechercher..." :value="'search'"/>
        <datalist :id="id + '-list'">
            <option v-for="item in list" :value="item"></option>
        </datalist>
    </form>
</template>
<script>
	export default {
		props: [
			'defSearch',
            'defDelay',
            'defMinChars'
        ],
        mounted: function() {
			this.id = 'uid-' + this._uid;
        },
		data: function() {
			return {
				list: [],
				search: this.defSearch || '',
                delay: this.defDelay || 500,
                minChars: this.defMinChars || 3,
                _hTimeOut: 0,
                id: -1
			};
		},
        methods: {
			inputHandler: function(oEvent) {
				if (this._hTimeOut) {
					clearTimeout(this._hTimeOut);
					this._hTimeOut = null;
				}
				this._hTimeOut = setTimeout(this.goSuggest.bind(this), this.delay);
            },

			/**
             * Lancer la recherche immédiatement
			 * @param oEvent
			 */
			submitHandler: function(oEvent) {
				oEvent.preventDefault();
				this.goSearch();
            },

			goSuggest: function() {
				if (this.search.length >= this.minChars) {
					this.$emit('suggest', this.search);
				}
			},

            goSearch: function() {
				this.$emit('search', this.search);
            }
        }
	}
</script>