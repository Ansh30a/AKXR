import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RestaurantCard from "../src/components/body/restaurant-card/RestaurantCard";

test("should render RestaurantCard with props data", () => {
    render(
        <MemoryRouter>
            // ------ Mock Data ------
            <RestaurantCard
                key={1}
                id={"1"}
                name={"Pizza"}
                cuisine={["Pizza"]}
                rating={4.5}
                eta={"14 mins"}
                imageId={"null"}
            />
        </MemoryRouter>,
    );

    expect(screen.getByText("Pizza Hut")).toBeInTheDocument();
});
