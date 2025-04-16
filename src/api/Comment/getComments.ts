import IComment from "@/types/IComment";

const getComments = async (take?: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
    const result: IComment[] = (await response.json()).reverse();

    if (take) {
        return result.slice(0, take);
    }

    return result;
}

export default getComments;