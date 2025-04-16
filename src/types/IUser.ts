import EPermissions from "@/types/EPermissions";

export default interface IUser {
    name: string;
    permissions: EPermissions[];
}