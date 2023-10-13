import { render, screen } from "@testing-library/react";
import { Item } from "src/components/Item";
import ue from "@testing-library/user-event";

describe("Элемент списка задач", () => {
  const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  it("название не должно быть больше 32 символов", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <Item
        id="1"
        header="очень длинный неподходящий заголовок"
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const labelEl = screen.getByText(/очень длинный/);

    expect(labelEl.innerHTML.length).toBeLessThanOrEqual(32);
  });

  it("название не должно быть пустым", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    const itemEl = render(
      <Item
        id="1"
        header=""
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    expect(itemEl.container).toBeEmptyDOMElement();
  });

  it("нельзя удалять невыполненные задачи", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <Item
        id="1"
        header="купить молоко"
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const deleteBtnEl = screen.getByRole("button", { name: "Удалить" });

    expect(deleteBtnEl).toBeDisabled();
  });

  it("нажатие на название задачи", async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <Item
        id="1"
        header="купить молоко"
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const labelEl = screen.getByText("купить молоко");

    await userEvent.click(labelEl);

    expect(onToggle).toBeCalledTimes(1);
  });

  it("нажатие на чекбокс", async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <Item
        id="1"
        header="купить молоко"
        done={false}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const checkboxEl = screen.getByRole("checkbox");

    await userEvent.click(checkboxEl);

    expect(onToggle).toBeCalledTimes(1);
  });

  it("нажатие на кнопку удаления", async () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    render(
      <Item
        id="1"
        header="купить молоко"
        done={true}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const deleteBtnEl = screen.getByRole("button", { name: "Удалить" });

    await userEvent.click(deleteBtnEl);

    expect(onDelete).toBeCalledTimes(1);
  });
});
