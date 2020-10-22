import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#b20838',
        secondary: '#8a7a67',
        accent: '#e65971',
        error: '#b22d08',
        info: '#bab2a9',
        success: '#08b282',
        warning: '#e8bf1c'
      },
    },
  }
});
