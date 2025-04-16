import { useNavigate } from "react-router-dom";
import checkPermission from "@/helpers/checkPermissions";
import IRouteConfig from "@/types/IRouteConfig";
import nav from "@/router/nav";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const SecureRouteElement: React.FC<React.PropsWithChildren<{ route: IRouteConfig }>> = ({ route, children }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    React.useEffect(() => {
        const user = queryClient.getQueryData(["user"]);

        if (!user) {
            navigate(nav.login.get(), { replace: true });
        }
    }, []);

    React.useEffect(() => {
        const hasPermission = checkPermission(route);
        
        if (!hasPermission) {
            navigate(nav.forbidden.get(), { replace: true });
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