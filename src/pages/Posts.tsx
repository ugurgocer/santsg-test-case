import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import List from "@/components/List";
import getPosts from "@/api/Post/getPosts";
import useNav from "@/router/useNav";
import deletePost from "@/api/Post/deletePost";
import IPost from "@/types/IPost";
import Card from "@/components/Card";
import Button from "@/components/Button";

const Posts: React.FC = () => {
    const queryClient = useQueryClient();
    const nav = useNav();

    const { data, isLoading } = useQuery({ queryKey: ["posts"], queryFn:() => getPosts() });
    const deletePostMutation = useMutation({
        mutationFn: (id: number) => deletePost(id).then(() => id),
        onSuccess: (deletedId) => {
            queryClient.setQueryData(['posts'], (oldData: IPost[]) => oldData?.filter((post) => post.id !== deletedId) || []);
            queryClient.invalidateQueries({ queryKey: ["post", deletedId] });
        },
    });

    const handleEdit = (id: number) => {
        nav.editPost.go({ id });
    }

    if(isLoading) return <div>Loading...</div>

    return (
        <Card
            header="Posts"
            extra={<Button title="Create" onClick={() => nav.createPost.go()} />}
            className="h-full"
        >
            <List>
                {data?.map((post) => (
                    <List.Item
                        key={post.id}
                        title={post.title}
                        description={post.body}
                        onClick={() => nav.post.go({ id: post.id })}
                        buttons={
                            [
                                {
                                    key: "edit",
                                    title: "Edit",
                                    type: "primary",
                                    onClick: () => handleEdit(post.id)
                                },
                                {
                                    key: "delete",
                                    title: "Delete",
                                    type: "danger",
                                    onClick: () => deletePostMutation.mutate(post.id)
                                }
                            ]
                        }
                    />
                ))}
            </List>
        </Card>
    )
}

export default Posts;