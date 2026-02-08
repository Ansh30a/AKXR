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
