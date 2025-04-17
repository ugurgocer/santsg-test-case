type ButtonProps = {
    title: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "default" | "primary" | "danger";
}

const Button: React.FC<ButtonProps> = ({title, onClick, type="default"}) => {

    const typeClass = {
        default: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
    }[type];

    return (
        <button title={title} onClick={onClick} className={`${typeClass} rounded py-1 px-2 cursor-pointer`} >
            {title}
        </button>
    );
}

export default Button;