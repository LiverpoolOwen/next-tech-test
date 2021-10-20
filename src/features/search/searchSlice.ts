import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ApiResult } from "../../interfaces/SearchResult";
import { fetchArtists } from "./SearchAPI";

export interface SearchState {
  value: ApiResult;
  status: "idle" | "loading" | "failed";
}

const initialState: SearchState = {
  value: { resultCount: 0, results: [] },
  status: "idle",
};

export const fetchArtistsAsync = createAsyncThunk(
  "counter/fetchArtists",
  async (searchTerm: string) => {
    const response = await fetchArtists(searchTerm);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArtistsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const { search } = searchSlice.actions;

export const selectSearchResult = (state: RootState) => state.search.value;

export default searchSlice.reducer;
