import IComment from "@/types/IComment";

const getPostComments = async (id: string) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const result: IComment[] = (await response.json()).reverse();
        return result;
    } catch {
        throw new Error("An error occurred while getting post comments.");
    }
}

export default getPostComments;