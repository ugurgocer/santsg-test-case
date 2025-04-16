import IComment from "@/types/IComment";

const getPostComments = async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    const result: IComment[] = (await response.json()).reverse();
    return result;
}

export default getPostComments;