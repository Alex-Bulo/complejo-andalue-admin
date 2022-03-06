export const APIDOMAIN = process.env.NODE_ENV ? 'https://andalue-kou8a.ondigitalocean.app/api/api' : 'http://localhost:3001/api' 

export const links=[
    {name:'Administrar',to:'/manage/calendars',submenus:[
            {name:'Calendarios', to:'/manage/calendars'},
            {name:'Reservar',to:'/manage/bookings'},
            {name:'Detalles Cabañas', to:'/manage/details'},
            {name:'Valorar', to:'/manage/ranks'}
        ]
    },
    {name:'Métricas',to:'/stats/feedback', submenus:[
            {name:'Calificaciones',to:'/stats/feedback'},
            {name:'Ocupación', to:'/stats/coverage'},
            {name:'Ganancias & Costos', to:'/stats/finance'}
        ]
    },
    {name:'Clientes',to:'/clients',submenus:[
            {name:'Listado', to:'/clientlist'}
        ]
    },
    {name:'Web',to:'/webadmin', submenus:[
            {name:'Detalles Sitio', to:'/webdetails'}
        ]
    }
]


export const getAverage = (feedback) => {
    
    const numericFb = feedback.filter( fb => fb.choice)
    
    const total = numericFb.length
    // console.log('total ', total);
    
    const sum = numericFb.reduce( (ac,value) => Number(value.feedback) + ac,0)
    console.log('AVERAGE  ', Math.round( (sum/total) * 100));
    return Math.round( (sum/total) * 100) / 100
}