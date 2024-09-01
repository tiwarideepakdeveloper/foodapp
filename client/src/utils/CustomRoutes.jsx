import { routes } from '../routes.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { Routes, Route } from "react-router-dom";

const CustomRoutes = () => {

    const protectedRoutes = routes.filter(function(route, index){
        return !!route.isProtected;
    });

    const unProtectedRoutes = routes.filter(function(route, index){
        return !route.isProtected;
    });

    return (
        <Routes>
            <Route element={ <ProtectedRoute />}>
                    {
                        protectedRoutes.map((route) => {
                            return ( 
                            <Route key={route.id}
                                exact path={route.path}
                                element={route.component}
                            ></Route>  
                            )
                        })
                    }
            </Route>
            {
                unProtectedRoutes.map((route) => {
                    return ( 
                        <Route key={route.id}
                            exact path={route.path}
                            element={route.component}
                        ></Route>  
                    )
                })
            }
        </Routes>
        
    );
    
}

export default CustomRoutes;


        
