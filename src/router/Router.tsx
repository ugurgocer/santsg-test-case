import { Routes, Route } from 'react-router-dom';
import React from 'react';
import routes from '@/router/routes';
import SecureRouteElement from '@/router/SecureRouteElement';
import IRouteConfig from '@/types/IRouteConfig';

const generateRoute = (route: IRouteConfig) => {
    let element;
    
    if (route.renderer.type === 'lazy') {
        const LazyComponent = React.lazy(route.renderer.element as (() => Promise<{ default: React.ComponentType }>));
        
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
            children={route.children ? route.children.map(generateRoute) : undefined}
        />
    )
}

const Router = () => {
    return (
        <Routes>
            {routes.map(generateRoute)}
        </Routes>
    )
}

export default Router;