import IPost from "@/types/IPost";

const editPost = async (data: IPost) => {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts/" + data.id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return data;
  } catch {
    throw new Error("An error occurred while editing post");
  }
};

export default editPost;
