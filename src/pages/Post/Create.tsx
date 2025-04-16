import { useMutation, useQueryClient } from "@tanstack/react-query";
import Card from "@/components/Card";
import PostForm from "@/forms/PostForm";
import IPost from "@/types/IPost";
import createPost from "@/api/Post/createPost";
import useNav from "@/router/useNav";

const CreatePost: React.FC = () => {
    const queryClient = useQueryClient();
    const nav = useNav();

    const createPostMutation = useMutation({
        mutationFn: (post: IPost) => createPost(post),
        onSuccess: (newPost) => {
            queryClient.setQueryData(['posts'], (oldData: IPost[]) => [newPost, ...oldData]);

            nav.posts.go({ }, { replace: true });
        },
    });

    return (
        <Card header="Create Post">
            <PostForm onSubmit={createPostMutation.mutate} />
        </Card>
    )
}

export default CreatePost;