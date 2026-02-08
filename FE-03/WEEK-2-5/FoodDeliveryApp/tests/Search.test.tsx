import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Body from "../src/components/body/Body";
import { vi } from "vitest";
import { BODY_API_MOCK } from "./mocks/bodyApiMock";

globalThis.fetch = vi.fn(() =>
    Promise.resolve({
        json: async () => BODY_API_MOCK,
    } as Response),
);

test("should render body component with search bar", async () => {
    render(
        <MemoryRouter>
            <Body />
        </MemoryRouter>,
    );

    // expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    const searchButton = await screen.findByRole("button", {
        name: /Search/i,
    });

    expect(searchButton).toBeInTheDocument();
});
