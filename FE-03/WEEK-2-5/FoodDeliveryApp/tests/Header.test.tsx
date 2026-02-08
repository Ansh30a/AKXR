import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "../src/components/header/Header";
import { Provider } from "react-redux";
import appStore from "../src/store/appStore";

test("should render Header with Login", () => {
    render(
        <MemoryRouter>
            <Provider store={appStore}><Header /></Provider>
        </MemoryRouter>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
});
