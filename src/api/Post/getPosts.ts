import IPost from "@/types/IPost";

const getPosts = async (take?: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const result: IPost[] = await response.json();

    if (take) {
        return result.slice(0, take);
    }

    return result;
}

export default getPosts;