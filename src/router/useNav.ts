import routes from '@/router/routes';
import INav, { INavMethodArguments } from '@/types/INav';
import { generatePath, NavigateOptions, useNavigate } from 'react-router-dom';
import checkPermission from '@/helpers/checkPermissions';
import IRouteConfig from '@/types/IRouteConfig';
import { useToast } from '@/context/ToastContext';

const useNav = (): INav => {
    const navigate = useNavigate();
    const { showToast }  = useToast();

    const go = (route: IRouteConfig, args: INavMethodArguments = {}, options?: NavigateOptions) => {
        const permission = checkPermission(route);
        
        if(permission)
            navigate(generatePath(route.path, args), options);
        else
            showToast("You don't have permission to access this page.", 'error');
    }

    const nav: INav = {};

    routes.forEach((route) => {
        if(route.children)
            route.children.forEach((child) => {
                nav[child.name] = {
                    get: (args: INavMethodArguments = {}) => generatePath(child.path, args),
                    go: (args, options) => go(child, args, options),
                }
            });

        nav[route.name] = {
            get: (args: INavMethodArguments = {}) => generatePath(route.path, args),
            go: (args, options) => go(route, args, options),
        }
    })

    return nav;
};

export default useNav;