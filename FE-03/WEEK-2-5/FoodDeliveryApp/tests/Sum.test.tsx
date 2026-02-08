// import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import sum from "../src/sumDemoForTest";

test("should calculate the sum of two numbers ", () => {
    const result = sum(3, 4);
    expect(result).toBe(7);
});
