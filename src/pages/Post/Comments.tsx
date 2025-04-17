import { useQuery } from "@tanstack/react-query";
import getPostComments from "@/api/Comment/getPostComments";
import { useParams } from "react-router-dom";
import Card from "@/components/Card";
import List from "@/components/List";
import Spinner from "@/components/Spinner";

const PostComments: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery({ queryKey: ["post"+id+"comments"], queryFn:() => getPostComments(id as string) });

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

export default PostComments;