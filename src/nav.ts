import routes from '@/route';
import INav, { INavMethodArguments } from './types/INav';
import { generatePath, redirect } from 'react-router-dom';
import IRouteConfig from './types/IRouteConfig';

const get = function(this: IRouteConfig, args: INavMethodArguments = {}) {
    return generatePath(this.path, args);
};

const go = function(this: IRouteConfig, args: INavMethodArguments = {}) {
    redirect(generatePath(this.path, args));
}

const nav: INav = (() => {
    const navItems = routes.map((route) => {
        return ({
            [route.name]: {
                get: get.bind(route),
                go: go.bind(route),
            }
        })
    })
    
    return Object.assign({}, ...navItems);
})();

export default nav;