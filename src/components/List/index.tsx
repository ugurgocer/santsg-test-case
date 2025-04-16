type ItemButtons = {
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
        <li key={item.key} onClick={() => onClick?.(item.key)}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.buttons?.map((button) => (
                <button
                    key={button.key}
                    onClick={(e) => {
                        e.stopPropagation();
                        button.onClick(item.key);
                    }}
                >
                    {button.title}
                </button>
            ))}
        </li>
    )
}

const List = ({ children }: React.PropsWithChildren) => {
  return (
    <ul>
        {children}
    </ul>
  );
}

List.Item = ListItem;

export default List;