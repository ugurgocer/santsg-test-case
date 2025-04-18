import { useMutation, useQueryClient } from "@tanstack/react-query";
import Card from "@/components/Card";
import PostForm from "@/forms/PostForm";
import IPost from "@/types/IPost";
import createPost from "@/api/Post/createPost";
import useNav from "@/router/useNav";
import { useToast } from "@/context/ToastContext";

const CreatePost: React.FC = () => {
    const queryClient = useQueryClient();
    const nav = useNav();
    const { showToast } = useToast();

    const createPostMutation = useMutation({
        mutationFn: (post: IPost) => createPost(post),
        onSuccess: (newPost) => {
            queryClient.setQueryData(['posts'], (oldData: IPost[]) => [newPost, ...oldData]);

            nav.posts.go({ }, { replace: true });
        },
        onError: (error) => showToast(error.message)
    });

    return (
        <Card header="Create Post">
            <PostForm onSubmit={createPostMutation.mutate} loading={createPostMutation.isPending} />
        </Card>
    )
}

export default CreatePost;