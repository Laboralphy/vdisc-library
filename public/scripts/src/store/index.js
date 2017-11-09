/**
 * Created by ralphy on 06/11/17.
 */

import actions from './actions';
import state from './state';
import mutations from './mutations';


const store = new Vuex.Store({
	state,
	mutations,
	actions
});


export default store;