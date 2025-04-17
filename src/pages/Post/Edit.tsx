import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import getPost from "@/api/Post/getPost";
import IPost from "@/types/IPost";
import PostForm from "@/forms/PostForm";
import Card from "@/components/Card";
import editPost from "@/api/Post/editPost";
import Spinner from "@/components/Spinner";

const EditPost: React.FC = () => {
    const { id } = useParams(); 
    const { data, isLoading } = useQuery({ queryKey: ["post"+id], queryFn:() => getPost(id as string) });
    const queryClient = useQueryClient();

    if (isLoading) {
        return <Spinner text="Form Loading" />
    }

    const editPostMutation = useMutation({
        mutationFn: (post: IPost) => editPost(post),
        onSuccess: (newPost) => {
            queryClient.setQueryData(['post'+newPost.id], newPost);
        },
    });

    return (
        <Card header="Edit Post">
            <PostForm data={data} onSubmit={editPostMutation.mutate} loading={editPostMutation.isPending} />
        </Card>
    )
}

export default EditPost;