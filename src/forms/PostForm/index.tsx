import IPost from "@/types/IPost";
import { useToast } from "@/context/ToastContext";
import React from "react";

type IProps = {
    data?: IPost;
    onSubmit: (data: IPost) => void;
    loading?: boolean
}

const PostForm: React.FC<IProps> = ({ data, onSubmit, loading }) => {
    const { showToast }  = useToast();
    const [errors, setErrors] = React.useState<{ title?: string, body?: string }>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if(!formData.get("title")) {
            setErrors({ ...errors, title: "Title is required" });
            return;
        }

        if(!formData.get("body")) {
            setErrors({ ...errors, body: "Body is required" });
            return;
        }

        setErrors({});

        const post: IPost = {
            id: data?.id || 0,
            title: formData.get("title") as string,
            body: formData.get("body") as string,
        }
        
        onSubmit(post);
        showToast("Form is saved successfuly", "success");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10 py-6">
            <div className="flex flex-col gap-1">
                <label htmlFor="title">Title: </label>
                <input type="text" className="p-2 block w-full border border-gray-200 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500" id="title" name="title" defaultValue={data?.title}/>
                {errors?.title ? <span className="bg-red-600 p-1 text-white">{errors.title}</span>: <></>}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="body">Body: </label>
                <textarea 
                    id="body"
                    className="p-2 block w-full border border-gray-200 rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                    name="body"
                    rows={5}
                    defaultValue={data?.body}
                />
                {errors?.body ? <span className="bg-red-600 p-1 text-white">{errors.body}</span>: <></>}
            </div>
            <input disabled={loading} type="submit" value="Save" className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 px-2 cursor-pointer disabled:cursor-progress disabled:bg-gray-300" />
        </form>
    );
}

export default PostForm;