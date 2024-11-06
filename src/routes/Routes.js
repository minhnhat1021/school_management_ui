
import Home from '~/pages/Home'
import { Login, Register } from '~/pages/LoginRegister'

import {MainLayout, AdminLayout} from '~/layouts'
import config from '~/config'


const publicRoutes = [

    { path: config.routes.home, component: Home},
    { path: config.routes.register, component: Register},
    { path: config.routes.login, component: Login},
]
const privateRoutes = [


]

const adminRoutes = [
    
    { path: config.routes.admin, component: Home, layout: AdminLayout},

]


export { publicRoutes, privateRoutes, adminRoutes}