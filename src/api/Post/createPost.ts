import IPost from "@/types/IPost";

const createPost = async (data: IPost) => {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
      });

      const result: IPost = await response.json();
      return result;
  } catch {
      throw new Error("An error occurred while creating post");
  }
}

export default createPost;