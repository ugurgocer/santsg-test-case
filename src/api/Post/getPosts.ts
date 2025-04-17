import IPost from "@/types/IPost";

const getPosts = async (take?: number) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const result: IPost[] = (await response.json()).reverse();

        if (take) {
            return result.slice(0, take);
        }

        return result;
    } catch {
        throw new Error("An error occurred while getting posts");
    }
}

export default getPosts;