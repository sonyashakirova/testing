import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { FilterButton } from "src/components/FilterButton";
import { List } from "src/components/List";
import { deleteTask, tasksSelector, toggleTask } from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(false);
  const filteredItems = items.filter((item) => !filter || !item.done);

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  const handleFilter = () => {
    setFilter((prevState) => !prevState);
  };

  return (
    <>
      <FilterButton onClick={handleFilter} />
      {filteredItems.length > 0 ? (
        <List
          items={filteredItems}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};
