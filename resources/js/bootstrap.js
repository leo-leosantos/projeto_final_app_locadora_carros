window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });


//interceptar os requst da aplicação
axios.interceptors.request.use(
    config => {
        //definir para tdas as requisições aceept e autoriztion

        config.headers.Accept = 'application/json'

        let token = document.cookie.split(';').find(indice => {
                    return indice.includes('token=')
                    // console.log(indice, indice.includes('token='))
        })

        token = token.split('=')[1]
        token = 'Bearer ' + token;

        config.headers.Authorization = token

        console.log('interceptando o request de envio', config)
        return config
    },

    error =>{
        console.log('Error', error)
        return Promisse.reject(error)
    }

)

//interceptar os responses da aplicação
axios.interceptors.response.use(

    response =>{
        console.log('interceptando a reponse da aplicação ', response)
        return response
    },

    error => {
        console.log('Error na resposta', error.response)

        if(error.response.status == 401 && error.response.data.message == "Token has expired" ){
            console.log('fazer uma nova req')

            axios.post('http://localhost/pf_app_locadora_carros/public/api/refresh')
            .then(response => {
                    console.log('Refresh ok', response)
                    document.cookie = 'token='+response.data.token+';SameSite=Lax'
                    console.log('token autal', response.data.token)
                    window.location.reload()
            })

        }
        return Promisse.reject(error)
    }
)
