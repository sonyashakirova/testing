import { Item } from "./Item";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const List = ({ items, onDelete, onToggle }: Props) => {
  let limitedItems = items;
  const uncompleted = items.filter((item) => !item.done);

  if (uncompleted.length > 10) {
    const extra = uncompleted
      .slice(10, uncompleted.length)
      .map((item) => item.id);

    limitedItems = limitedItems.filter((item) => !extra.includes(item.id));
  }

  return (
    <ul className="task-list tasks">
      {limitedItems.map((item) => (
        <Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
};
