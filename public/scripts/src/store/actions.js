/**
 * Created by ralphy on 06/11/17.
 */

import * as types from './mutation-types';
import {SUGGEST_SEARCH} from "./mutation-types";

export default {
    [types.SEARCH_SHOWS]: function({commit}, sSearch) {
        commit(types.SEARCH_SHOWS, sSearch);
    },

    [types.FEED_STORE]: function({commit}, data) {
        commit(types.FEED_STORE, data);
    },

    [SUGGEST_SEARCH]: function({commi}, data) {
        commit(types.SUGGEST_SEARCH, data);
    }
};
