import { TestSlice } from "../types";

export const updateLS = (data: TestSlice) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('state', JSON.stringify(data));
    }
};
