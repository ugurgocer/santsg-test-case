import checkPermission from "@/helpers/checkPermissions";
import IRouteConfig from "@/types/IRouteConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useNav from "@/router/useNav";

const SecureRouteElement: React.FC<React.PropsWithChildren<{ route: IRouteConfig }>> = ({ route, children }) => {
    const queryClient = useQueryClient();
    const nav = useNav();
    
    React.useEffect(() => {
    if (!queryClient.getQueryData(["user"])) {
        nav.login.go({}, { replace: true });
        return;
    }

    const hasPermission = checkPermission(route);
    if (!hasPermission) {
        nav.forbidden.go({}, { replace: true });
    }
    }, [route]);

    const { isPending } = useQuery({
        queryKey: [route.name, "translations"],
        queryFn: route.translations
    });
    
    if (isPending) {
        return <div>Loading...</div>;
    }

    return <>{children}</>
}

export default SecureRouteElement;