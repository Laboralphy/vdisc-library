/**
 * Created by ralphy on 30/08/17.
 */

export default new Vuex.Store({
	state: {
		name: '',
		version: '',
		quality: '',
		rank: 0,
	},
	mutations: {
		setName(sName) {
			state.name = sName;
		},

		setVersion(sVer) {
			state.version = sVer;
		},
		setQuality(sQual) {
			state.quality = sQual;
		},
		setRank(nRank) {
			state.rank= nRank;
		}
	}
});

