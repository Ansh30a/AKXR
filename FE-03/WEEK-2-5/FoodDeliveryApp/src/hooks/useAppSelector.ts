import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../store/appStore";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
