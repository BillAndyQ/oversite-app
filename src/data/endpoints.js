
export const ENDPOINTS = {
    auth: {
        login: {method: "POST", url: '/auth/login'},
        register: {method: "POST", url: '/auth/register'},
        logout: {method: "POST", url: '/auth/logout'},
    },
    otequipos: {
        list: {method: "GET", url: '/ot-equipo'},
        create: {method: "POST", url: '/ot-equipo'},
        get: (n_order = "") => ({method: "GET", url: `/ot-equipo/${n_order}`}),
        update: (n_order = "") => ({method: "PATCH", url: `/ot-equipo/${n_order}`}),
        delete: (n_order = "") => ({method: "DELETE", url: `/ot-equipo/${n_order}`}),
    },
    otpersonas: {
        list: {method: "GET", url: '/ot-persona'},
        create: {method: "POST", url: '/ot-persona'},
        get: (n_order = "") => ({method: "GET", url: `/ot-persona/${n_order}`}),
        update: (n_order = "") => ({method: "PATCH", url: `/ot-persona/${n_order}`}),
        delete: (n_order = "") => ({method: "DELETE", url: `/ot-persona/${n_order}`}),
    },
    unidades: {
        list: {method: "GET", url: '/unidad'},
        listByOrder: (n_order = "") => ({method: "GET", url: `/unidad?n_order=${n_order}`}),
        create: {method: "POST", url: '/unidad'},
        get: (code = "") => ({method: "GET", url: `/unidad/${code}`}),
        update: (code = "") => ({method: "PATCH", url: `/unidad/${code}`}),
        delete: (code = "") => ({method: "DELETE", url: `/unidad/${code}`}),
    },
    empresas: {
        list: {method: "GET", url: '/enterprise'},
        create: {method: "POST", url: '/enterprise'},
        get: (ruc = "") => ({method: "GET", url: `/enterprise/${ruc}`}),
        update: (ruc = "") => ({method: "PATCH", url: `/enterprise/${ruc}`}),
        delete: (ruc = "") => ({method: "DELETE", url: `/enterprise/${ruc}`}),
    },
    cotizacion: {
        equipos: {
            list: {method: "GET", url: '/quotation/equipo'},
            create: {method: "POST", url: '/quotation/equipo'},
            get: (n_cot = "") => ({method: "GET", url: `/quotation/equipo/${n_cot}`}),
            update: (n_cot = "") => ({method: "PATCH", url: `/quotation/equipo/${n_cot}`}),
            delete: (n_cot = "") => ({method: "DELETE", url: `/quotation/equipo/${n_cot}`}),
        },
        personas: {
            list: {method: "GET", url: '/quotation/persona'},
            create: {method: "POST", url: '/quotation/persona'},
            get: (n_cot = "") => ({method: "GET", url: `/quotation/persona/${n_cot}`}),
            update: (n_cot = "") => ({method: "PATCH", url: `/quotation/persona/${n_cot}`}),
            delete: (n_cot = "") => ({method: "DELETE", url: `/quotation/persona/${n_cot}`}),
        }
    }
}
