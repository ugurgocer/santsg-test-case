import IPost from "@/types/IPost";

const editPost = async (data: IPost) => {
    await fetch("https://jsonplaceholder.typicode.com/posts/"+data.id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
    });

    return data;
}

export default editPost;