import { Outlet, useParams, useLocation } from "react-router-dom";
import Card from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import getPost from "@/api/Post/getPost";
import useNav from "@/router/useNav";
import React from "react";
import Button from "@/components/Button";

const Post: React.FC = () => {
    const { id } = useParams();
    const nav = useNav();
    const location = useLocation();

    const { data, isLoading } = useQuery({ queryKey: ["post"+id], queryFn:() => getPost(id as string) });

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Card header={data?.title as string}>
            <p className="py-4 font-light text-gray-700">{data?.body}</p>
            
            <div className="py-4">
                <Button key="editPost" title="Edit Post" type={location.pathname == nav.editPost.get({ id: id as string }) ? 'primary' : 'default'} onClick={() => nav.editPost.go({ id: id as string })} />
                <Button key="postComments" title="Comments" type={location.pathname == nav.postComments.get({ id: id as string }) ? 'primary' : 'default'} onClick={() => nav.postComments.go({ id: id as string  })} />

                <Outlet /> 
            </div>
        </Card>
    )
}

export default Post;