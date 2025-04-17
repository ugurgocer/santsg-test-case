import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import useNav from "@/router/useNav";
import Button from "@/components/Button";
import IUser from "@/types/IUser";

const Layout: React.FC<React.PropsWithChildren>= ({ children }) => {
    const queryClient = useQueryClient();
    const user: IUser | undefined = queryClient.getQueryData(["user"]);
    const nav = useNav();

    const logout = () => {
        queryClient.removeQueries({ queryKey: ["user"] });

        nav.login.go({}, { replace: true });
    };

    const userInfo = () => {
        if (!user) return null;

        return (
            <div className="flex items-center gap-2">
                <span className="text-gray-800">{user.name}</span>
                <Button title="Logout" onClick={logout} type="danger" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="px-6 py-3 flex items-center justify-between shadow-sm h-16 bg-white z-10">
                <h1 className="text-blue-700 hover:text-blue-800 text-2xl font-bold cursor-pointer" onClick={user ? () => nav.home.go() : undefined}>SANTSG Test Case</h1>
                {userInfo()}
            </header>
            <main className="py-4 px-6 flex-1 overflow-y-auto bg-gray-50">
                {children}
            </main>
        </div>
    );
}

export default Layout;