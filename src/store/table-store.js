import { create } from "zustand";

export const useTableStore = create((set) => ({
  tableData: [],
  setTableData: (data) => set({ tableData: data }),
}));