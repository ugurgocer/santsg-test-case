import Button from "@/components/Button";

type ItemButtons = {
    type?: "default" | "danger" | "primary"
    key: number | string;
    title: string;
    onClick: (key: number | string) => void;
}

type ItemProps = {
    key: number | string;
    title: string;
    description: string;
    buttons?: ItemButtons[];
    onClick?: (key: number | string) => void;
}

const ListItem = ({ onClick, ...item }: ItemProps) => {
    return (
        <li className="bg-white hover:bg-gray-100 flex flex-row justify-between items-center border-b border-gray-300 p-2" key={item.key} onClick={() => onClick?.(item.key)}>
            <div id="content" className="flex flex-col gap-2">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p title={item.description} className="font-light text-gray-700 line-clamp-1">{item.description}</p>
            </div>
            <div id="buttons" className="flex flex-row gap-2 items-center">
                {item.buttons?.map(({ key, title, onClick, type }) => (
                    <Button
                        key={key}
                        title={title}
                        type={type}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(item.key);
                        }}
                    />
                ))}
            </div>
        </li>
    )
}

const List = ({ children }: React.PropsWithChildren) => {
  return (
    <ul className="flex flex-col">
        {children}
    </ul>
  );
}

List.Item = ListItem;

export default List;