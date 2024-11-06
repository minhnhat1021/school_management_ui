
import Home from '~/pages/Home'
import { Login, Register } from '~/pages/LoginRegister'

import {MainLayout} from '~/layouts'
import config from '~/config'


const publicRoutes = [

    { path: config.routes.home, component: Home},
    { path: config.routes.register, component: Register},
    { path: config.routes.login, component: Login},
]
const privateRoutes = [


]

const adminRoutes = [
    

]


export { publicRoutes, privateRoutes, adminRoutes}