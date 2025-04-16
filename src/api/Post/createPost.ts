import IPost from "@/types/IPost";

const createPost = async (data: IPost) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });

    const result: IPost = await response.json();
    return result;
}

export default createPost;