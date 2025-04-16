import { NavigateOptions } from "react-router-dom";

export interface INavMethodArguments {
    [key: string]: string | number | boolean;
}

export interface INavItem {
    get: (args?: INavMethodArguments) => string;
    go: (args?: INavMethodArguments, options?: NavigateOptions) => void;
}

export default interface INav {
    [key: string]: INavItem;
}