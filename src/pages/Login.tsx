import type IUser from "@/types/IUser";
import EPermissions from "@/types/EPermissions";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import useNav from "@/router/useNav";

const dummyUser: IUser = {
    name: "John Doe",
    permissions: [
        EPermissions.VIEW_POSTS,
        EPermissions.VIEW_COMMENTS
    ]
}

const Login: React.FC = () => {
    const queryClient = useQueryClient();
    const nav = useNav();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        queryClient.setQueryData(["user"], dummyUser);
        nav.home.go({}, { replace: true });
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-12 max-w-md mx-auto bg-white p-6 rounded shadow">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="block font-semibold text-gray-700">Name </label>
                <input className="p-2 block w-full border border-gray-200 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed" id="name" disabled type="text" value={dummyUser.name} />
            </div>

            <input type="submit" value="Login" className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-2 cursor-pointer" />
        </form>
    ); 
}

export default Login;