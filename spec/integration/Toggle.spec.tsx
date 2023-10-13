import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { App } from "src/App";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

it("Нельзя отменить выполненную задачу, если в списке уже есть 10 невыполненных задач", async () => {
  render(<App />);

  const inputEl = screen.getByRole("textbox");
  const addBtnEl = screen.getByRole("button", { name: /Добавить/i });

  for (let i = 0; i < 10; i++) {
    await userEvent.type(inputEl, "пример задачи");
    await userEvent.click(addBtnEl);
  }

  const firstItem = screen.getAllByRole("checkbox")[0];

  await userEvent.click(firstItem);
  await userEvent.type(inputEl, "одиннадцатая задача");
  await userEvent.click(addBtnEl);
  await userEvent.click(firstItem);

  const uncompleted = screen.getAllByRole("checkbox", { checked: false });
  const notifier = screen.getByTestId("notifier");

  expect(firstItem).toBeChecked();
  expect(uncompleted).toHaveLength(10);
  expect(notifier).toBeInTheDocument();
});
