import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Fragment} from "react"
import { MainLayout, AdminLayout } from '~/layouts'

import { publicRoutes, privateRoutes, adminRoutes } from '~/routes'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = MainLayout
                        
                        if(route.layout) {
                            Layout = route.layout 
                        }else if(route.layout === null) {
                            Layout = Fragment
                        }
                        
                        const Page = route.component
                        
                        return <Route 
                                    key={index} 
                                    path={route.path} 
                                    element={ <Layout><Page /> </Layout> }
                                />
                        
                    })}

                    {adminRoutes.map((route, index) => {
                        let Layout = AdminLayout
                        let SubLayout = Fragment

                        if(route.layout) {
                            Layout = route.layout 
                        }else if(route.layout === null) {
                            Layout = Fragment
                        }

                        if(route.subLayout) {
                            SubLayout = route.subLayout
                        }

                        const Page = route.component

                        return <Route 
                            key={index} 
                            path={route.path} 
                            element={
                                        <Layout> 
                                            <SubLayout> <Page /> </SubLayout>
                                        </Layout>
                                    } 
                        />
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App
