const deletePost = async (id: number) => {
    await fetch("https://jsonplaceholder.typicode.com/posts/"+id, {
        method: "DELETE"
    });
}

export default deletePost;