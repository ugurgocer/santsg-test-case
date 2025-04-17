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
        <form onSubmit={handleSubmit} className="space-y-10 py-6">
            <div>
                <label htmlFor="title">Title: </label>
                <input type="text" className="p-2 block w-full border border-gray-200 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" id="title" name="title" defaultValue={data?.title}/>
            </div>
            <div>
                <label htmlFor="body">Body: </label>
                <textarea 
                    id="body"
                    className="p-2 block w-full border border-gray-200 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                    name="body"
                    rows={5}
                    defaultValue={data?.body}
                />
            </div>
            <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-2 cursor-pointer" />
        </form>
    );
}

export default PostForm;