import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import routes from '@/router/routes';
import SecureRouteElement from '@/router/SecureRouteElement';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => {
                    let element;
        
                    if (route.renderer.type === 'lazy') {
                        const LazyComponent = React.lazy(route.renderer.element as (() => Promise<{ default: React.ComponentType;}>));
                        
                        element = (
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <SecureRouteElement route={route}>
                                    <LazyComponent />
                                </SecureRouteElement>
                            </React.Suspense>
                        )
                    } else {
                        const RouteComponent = route.renderer.element as React.ComponentType;
            
                        element = (
                            <SecureRouteElement route={route}>
                                <RouteComponent />
                            </SecureRouteElement>
                        )
                    }
        
                    return (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={element}
                        />
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default Router;