
export const ENDPOINTS = {
    auth: {
        login: {method: "POST", url: '/auth/login'},
        register: {method: "POST", url: '/auth/register'},
        logout: {method: "POST", url: '/auth/logout'},
    },
    otequipos: {
        list: {method: "GET", url: '/ot-equipo'},
        create: {method: "POST", url: '/ot-equipo'},
        get: {method: "GET", url: '/ot-equipo/:n_order'},
        update: {method: "PUT", url: '/ot-equipo/:n_order'},
        delete: {method: "DELETE", url: '/ot-equipo/:n_order'},
    },
    otpersonas: {
        list: {method: "GET", url: '/ot-persona'},
        create: {method: "POST", url: '/ot-persona'},
        get: {method: "GET", url: '/ot-persona/:n_order'},
        update: {method: "PUT", url: '/ot-persona/:n_order'},
        delete: {method: "DELETE", url: '/ot-persona/:n_order'},
    }
}
