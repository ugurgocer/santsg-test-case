import type IUser from "@/types/IUser";
import EPermissions from "@/types/EPermissions";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import useNav from "@/router/useNav";

const dummyUser: IUser = {
    name: "John Doe",
    permissions: [
        EPermissions.VIEW_POSTS,
        EPermissions.VIEW_COMMENTS,
        EPermissions.CREATE_POST,
        EPermissions.EDIT_POST,
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name: </label>
                <input id="name" disabled type="text" value={dummyUser.name} />
            </div>

            <input type="submit" value="Login" />
        </form>
    ); 
}

export default Login;