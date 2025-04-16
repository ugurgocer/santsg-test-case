import routes from '@/router/routes';
import INav, { INavMethodArguments } from '@/types/INav';
import { generatePath, redirect } from 'react-router-dom';
import IRouteConfig from '@/types/IRouteConfig';
import checkPermission from '@/helpers/checkPermissions';

const get = function(this: IRouteConfig, args: INavMethodArguments = {}) {
    return generatePath(this.path, args);
};

const go = function(this: IRouteConfig, args: INavMethodArguments = {}) {
    const permission = checkPermission(this);

    if(permission)
        redirect(generatePath(this.path, args))
    else
        alert("You don't have permission to access this page.");
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