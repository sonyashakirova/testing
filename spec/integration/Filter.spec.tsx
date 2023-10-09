import { render, screen } from "@testing-library/react";
import { TaskList } from "src/modules/TaskList";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import ue from "@testing-library/user-event";
import * as taskSliceModule from "src/store/taskSlice";

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
});

const items: Task[] = [
    {
        id: "1",
        header: "купить молоко",
        done: true,
    },
    {
        id: "2",
        header: "купить хлеб",
        done: false,
    },
];

describe("Список задач", () => {
    it("первоначальное состояние: содержит все задачи", () => {
        jest.spyOn(taskSliceModule, "tasksSelector").mockReturnValue(items);

        render(<TaskList />, { wrapper: JestStoreProvider });

        const listItems = screen.getAllByRole("listitem");

        expect(listItems).toHaveLength(2);
    });

    it("с включенным фильтром: не содержит выполненные задачи", async () => {
        jest.spyOn(taskSliceModule, "tasksSelector").mockReturnValue(items);

        render(<TaskList />, { wrapper: JestStoreProvider });

        const filterBtn = screen.getByRole("button", {
            name: /отфильтровать задачи/i,
        });

        await userEvent.click(filterBtn);

        const checkboxElements = screen.getAllByRole("checkbox");

        checkboxElements.forEach((el) => {
            expect(el).not.toBeChecked();
        });
    });

    it("с выключенным фильтром: сожержит все задачи", async () => {
        jest.spyOn(taskSliceModule, "tasksSelector").mockReturnValue(items);

        render(<TaskList />, { wrapper: JestStoreProvider });

        const filterBtn = screen.getByRole("button", {
            name: /отфильтровать задачи/i,
        });

        await userEvent.dblClick(filterBtn);

        const listItems = screen.getAllByRole("listitem");

        expect(listItems).toHaveLength(2);
    });
});
