import { useQuery } from "@tanstack/react-query";
import Card from "@/components/Card"
import List from "@/components/List";
import getPosts from "@/api/Post/getPosts";
import { Link } from "react-router-dom";
import useNav from "@/router/useNav";
import getComments from "@/api/Comment/getComments";

const PostList: React.FC = () => {
    const nav = useNav();
    const { data, isLoading } = useQuery({ queryKey: ["posts", 5], queryFn:() => getPosts(5) });

    if (isLoading) {
        return "Posts Loading...";
    }

    return (
        <Card
            header="Posts"
            footer={<Link to={nav.posts.get()}>See all posts</Link>}
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
    const { data, isLoading } = useQuery({ queryKey: ["comments", 5], queryFn:() => getComments(5) });

    if (isLoading) {
        return "Comments Loading...";
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
        <>
            <PostList />
            <CommentList />
        </>
    )
}

export default Home;