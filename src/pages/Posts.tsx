import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import List from "@/components/List";
import getPosts from "@/api/Post/getPosts";
import useNav from "@/router/useNav";
import deletePost from "@/api/Post/deletePost";
import IPost from "@/types/IPost";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { useConfirm } from "@/context/ConfirmContext";
import { useToast } from "@/context/ToastContext";

const Posts: React.FC = () => {
    const queryClient = useQueryClient();
    const nav = useNav();
    const confirm = useConfirm();
    const { showToast } = useToast();

    const { data, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn:() => getPosts(),
        staleTime: 1000 * 30,
        gcTime: 1000 * 60 * 5
    });
    const deletePostMutation = useMutation({
        mutationFn: (id: number) => deletePost(id).then(() => id),
        onSuccess: (deletedId) => {
            queryClient.setQueryData(['posts'], (oldData: IPost[]) => oldData?.filter((post) => post.id !== deletedId) || []);

            showToast("Post is deleted", "success");
        },
        onError: (error) => showToast(error.message)
    });

    const handleEdit = (id: number) => {
        nav.editPost.go({ id });
    }

    const handleDelete =(id: number) => {
        confirm({
            message: "Are you sure you want to delete this post?",
            onResponse: (result: boolean) => {
                if(result) {
                    deletePostMutation.mutate(id);
                }
            }
        })
    }

    if(isLoading) return <Spinner text="Posts loading" />

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
                                    onClick: () => handleDelete(post.id)
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