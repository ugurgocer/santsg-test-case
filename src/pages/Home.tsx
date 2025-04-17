import { useQuery } from "@tanstack/react-query";
import Card from "@/components/Card"
import List from "@/components/List";
import getPosts from "@/api/Post/getPosts";
import { Link } from "react-router-dom";
import useNav from "@/router/useNav";
import getComments from "@/api/Comment/getComments";
import Spinner from "@/components/Spinner";

const PostList: React.FC = () => {
    const nav = useNav();
    const { data, isLoading } = useQuery({ queryKey: ["dashboardPosts"], queryFn:() => getPosts(5) });

    if (isLoading) {
        return <Spinner text="Posts Loading" />
    }

    return (
        <Card
            header="Posts"
            footer={<Link className="text-blue-500 hover:text-blue-600" to={nav.posts.get()}>See all posts</Link>}
        >
            <List>
                {data?.map((post) => (
                    <List.Item
                        key={post.id}
                        title={post.title}
                        description={post.body}
                        onClick={() => nav.post.go({ id: post.id })}
                    />
                ))}
            </List>
        </Card>
    )
}

const CommentList: React.FC = () => {
    const { data, isLoading } = useQuery({ queryKey: ["dashboardComments"], queryFn:() => getComments(5) });

    if (isLoading) {
        return <Spinner text="Comments Loading" />
    }

    return (
        <Card
            header="Comments"
        >
            <List>
                {data?.map((comment) => (
                    <List.Item
                        key={comment.id}
                        title={comment.name + " - " + comment.email}
                        description={comment.body}
                    />
                ))}
            </List>
        </Card>
    )
}

const Home: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <PostList />
            <CommentList />
        </div>
    )
}

export default Home;