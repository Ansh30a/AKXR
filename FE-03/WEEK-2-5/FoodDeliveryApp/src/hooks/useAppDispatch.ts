import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/appStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();