export interface INavMethodArguments {
    [key: string]: string | number | boolean;
}

export interface INavItem {
    get: (args?: INavMethodArguments) => string;
    go: (args?: INavMethodArguments) => void;
}

export default interface INav {
    [key: string]: INavItem;
}