import EPermissions from "./EPermissions";

export default interface IRouteConfig {
    name: string;
    path: string;
    renderer: {
      type: "element" | "lazy";
      component: React.ComponentType | (() => Promise<{ default: React.ComponentType }>);
    };
    permissions?: EPermissions[];
    translations?: () => Promise<void>;
}