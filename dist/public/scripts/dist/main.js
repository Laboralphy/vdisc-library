'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

/**
 * Created by ralphy on 20/05/17.
 */

function main() {
    var application = new Vue({
        el: '#application',
        data: {
            sTitleColor: 'blue'
        }
    });
}

var Toto = function () {
    function Toto() {
        _classCallCheck(this, Toto);
    }

    _createClass(Toto, [{
        key: 'truc',
        value: function truc() {
            return 1;
        }
    }]);

    return Toto;
}();

window.addEventListener('load', main);
//# sourceMappingURL=main.js.map
//# sourceMappingURL=main.js.map