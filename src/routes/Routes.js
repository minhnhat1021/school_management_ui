
import Home from '~/pages/Home'
import { Login, Register } from '~/pages/LoginRegister'

import {AdminLayout, ManagementLayout} from '~/layouts'

import { 
    Admin, 
    AdminLogin, 
    AdminRegister, 
    UserList,
    CompetitionRegistration,

} from '~/pages/Admin'

import config from '~/config'


const publicRoutes = [

    { path: config.routes.home, component: Home},
    { path: config.routes.register, component: Register},
    { path: config.routes.login, component: Login},

    { path: config.routes.adminLogin, component: AdminLogin, layout: AdminLayout },
    { path: config.routes.adminRegister, component: AdminRegister, layout: AdminLayout}
]
const privateRoutes = [


]

const adminRoutes = [
    
    { path: config.routes.admin, component: Admin},
    { path: config.routes.userList, component: UserList, subLayout: ManagementLayout},
    { path: config.routes.competitionRegistration, component: CompetitionRegistration, subLayout: ManagementLayout},

]


export { publicRoutes, privateRoutes, adminRoutes}