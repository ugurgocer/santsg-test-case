import IUser from "@/types/IUser";
import queryClient from "@/lib/queryClient";
import IRouteConfig from "@/types/IRouteConfig";

const checkPermission = (route: IRouteConfig) => {
    const { permissions:userPermissions = [] } = queryClient.getQueryData<IUser>(["user"]) || {};

    const permissions = route.permissions || [];
    if(permissions.length === 0) return true;

    return permissions.every((permission) => userPermissions.includes(permission));
}

export default checkPermission;