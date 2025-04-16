import { Outlet, useParams, NavLink } from "react-router-dom";
import Card from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import getPost from "@/api/Post/getPost";
import useNav from "@/router/useNav";

const Post: React.FC = () => {
    const { id } = useParams();
    const nav = useNav();

    const { data, isLoading } = useQuery({ queryKey: ["post"+id], queryFn:() => getPost(id as string) });

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Card header={data?.title as string}>
            <p>{data?.body}</p>
            
            <div>
                <NavLink
                    to={nav.editPost.get({ id: id as string })}
                >
                    Edit Post
                </NavLink>

                <NavLink
                    to={nav.postComments.get({ id: id as string })}
                >
                    Comments
                </NavLink>
            </div>

            <Outlet />
        </Card>
    )
}

export default Post;