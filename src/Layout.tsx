import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import useNav from "@/router/useNav";

const Layout: React.FC<React.PropsWithChildren>= ({ children }) => {
    const queryClient = useQueryClient();
    const isLogged = queryClient.getQueryData(["user"]) !== undefined;
    const nav = useNav();

    const logout = () => {
        queryClient.setQueryData(["user"], undefined);
        queryClient.clear();

        nav.login.go({}, { replace: true });
    };

    return (
        <div>
            <header>
                <h1>Header</h1>
                {isLogged ? <button onClick={logout}>Logout</button> : <></>}
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>&copy; 2025</p>
            </footer>
        </div>
    );
}

export default Layout;