import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { App } from "src/App";

describe("Оповещение при вополнении задачи", () => {
  const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  it("появляется и содержит заголовок задачи", async () => {
    render(<App />);

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByRole("button", { name: /Добавить/i });

    await userEvent.type(inputEl, "купить печеньки");
    await userEvent.click(addBtnEl);

    const taskEl = screen.getByText("купить печеньки");

    await userEvent.click(taskEl);

    const notifierEl = screen.getByTestId("notifier");

    expect(notifierEl.innerHTML).toContain("купить печеньки");
  });

  it("одновременно может отображаться только одно", async () => {
    render(<App />);

    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByRole("button", { name: /Добавить/i });

    await userEvent.type(inputEl, "первая задача");
    await userEvent.click(addBtnEl);
    await userEvent.type(inputEl, "вторая задача");
    await userEvent.click(addBtnEl);

    const task1 = screen.getByText("первая задача");
    const task2 = screen.getByText("вторая задача");

    await userEvent.click(task1);
    await userEvent.click(task2);

    const notifiers = screen.getAllByTestId("notifier");

    expect(notifiers).toHaveLength(1);
  });
});
