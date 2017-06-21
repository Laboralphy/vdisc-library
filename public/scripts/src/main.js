/**
 * Created by ralphy on 20/05/17.
 */

function main () {

    Vue.component('title-bar', {
        props: ['defColor', 'defCaption'],
        template:
            `<h3 v-bind:class="'title ' + color">{{ caption }}</h3>`,
        data: function() {
            return {
                color: this.defColor,
                caption: this.defCaption
            };
        }
    });

    Vue.component('menu-bar', {
        props: ['defItems'],
        template:
            `<nav>
                <ul>
                    <li v-for="item in items">
                        <button v-on:click="" type="button">{{ item }}</button>
                    </li>
                </ul>
            </nav>`,
        data: function() {
            return {
                items: this.defItems.split('|')
            };
        }
    });



    const app = new Vue({
        el: '#application'
    });




    window.Application = app;
}

window.addEventListener('load', main);