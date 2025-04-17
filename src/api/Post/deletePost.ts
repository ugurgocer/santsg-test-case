const deletePost = async (id: number) => {
    try {
        await fetch("https://jsonplaceholder.typicode.com/posts/"+id, {
            method: "DELETE"
        });
    } catch {
        throw new Error("An error occurred while deleting post");
    }
}

export default deletePost;