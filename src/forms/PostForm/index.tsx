import IPost from "@/types/IPost";

type IProps = {
    data?: IPost;
    onSubmit: (data: IPost) => void;
}

const PostForm: React.FC<IProps> = ({ data, onSubmit }) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const post: IPost = {
            id: data?.id || 0,
            title: formData.get("title") as string,
            body: formData.get("body") as string,
        }
        
        onSubmit(post);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" defaultValue={data?.title}/>
            </div>
            <div>
                <label htmlFor="body">Body: </label>
                <textarea id="body" name="body" defaultValue={data?.body}></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default PostForm;