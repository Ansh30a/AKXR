import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Body from "../src/components/body/Body";
import { vi } from 

global.fetch = vi.fn