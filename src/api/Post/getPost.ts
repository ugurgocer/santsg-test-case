import IPost from "@/types/IPost";

const getPost = async (id: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const result: IPost = await response.json();
    return result;
}

export default getPost;