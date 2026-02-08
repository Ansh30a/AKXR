import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Contact from "../src/components/contact/Contact";

test("renders contact", () => {
    render(
        <MemoryRouter>
            <Contact />
        </MemoryRouter>,
    );

    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});

test("renders button inside contact", () => {
    render(
        <MemoryRouter>
            <Contact />
        </MemoryRouter>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
});

test("renders button inside contact", () => {
    render(
        <MemoryRouter>
            <Contact />
        </MemoryRouter>,
    );

    expect(screen.getAllByRole('textbox').length).toBe(4);
});