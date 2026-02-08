import { fireEvent, render, screen } from "@testing-library/react";
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

test("should render Header with car items = 0", () => {
    render(
        <MemoryRouter>
            <Provider store={appStore}><Header /></Provider>
        </MemoryRouter>,
    );

    expect(screen.getByText("0")).toBeInTheDocument();
});

test("should change Login to Logout", () => {
    render(
        <MemoryRouter>
            <Provider store={appStore}><Header /></Provider>
        </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByRole("button", { name: "Default User" })).toBeInTheDocument();
});