import routes from '@/router/routes';
import INav, { INavMethodArguments } from '@/types/INav';
import { generatePath, NavigateOptions, useNavigate } from 'react-router-dom';
import checkPermission from '@/helpers/checkPermissions';

const useNav = (): INav => {
    const navigate = useNavigate();

    const navItems = routes.map((route) => {
        const go = (args: INavMethodArguments = {}, options?: NavigateOptions) => {
            const permission = checkPermission(route);
            
            if(permission)
                navigate(generatePath(route.path, args), options);
            else
                alert("You don't have permission to access this page.");
        }

        return ({
            [route.name]: {
                get: (args: INavMethodArguments = {}) => generatePath(route.path, args),
                go,
            }
        })
    })
    
    return Object.assign({}, ...navItems);
};

export default useNav;