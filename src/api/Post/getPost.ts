import IPost from "@/types/IPost";

const getPost = async (id: string) => {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const result: IPost = await response.json();
        return result;
    } catch {
        throw new Error("An error occurred while getting post");
    }
}

export default getPost;