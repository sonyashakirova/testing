import { DeleteButton } from "./DeleteButton";

type Props = Task & {
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const Item = (props: Props) => {
  let header = props.header;

  if (props.header.length > 32) {
    header = header.slice(0, 31) + "…";
  }

  if (!header) return null;

  return (
    <li className="item-wrapper">
      <input
        type="checkbox"
        id={props.id}
        checked={props.done}
        onChange={() => props.onToggle(props.id)}
      />
      <label htmlFor={props.id}>{props.done ? <s>{header}</s> : header}</label>
      <DeleteButton
        disabled={!props.done}
        onClick={() => props.onDelete(props.id)}
      />
    </li>
  );
};
