type Props = {
  onClick: () => void;
};

export const FilterButton = ({ onClick }: Props) => {
  return (
    <button className="button button-with-text" onClick={onClick}>
      Отфильтровать задачи
    </button>
  );
};
