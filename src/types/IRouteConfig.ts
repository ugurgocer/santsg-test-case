import EPermissions from "@/types/EPermissions";

export default interface IRouteConfig {
    name: string;
    path: string;
    renderer: {
      type: "element" | "lazy";
      element: React.ComponentType | (() => Promise<{ default: React.ComponentType }>);
    };
    permissions?: EPermissions[];
    translations?: () => Promise<any>;
}