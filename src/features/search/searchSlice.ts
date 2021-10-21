import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SearchParams } from "../../interfaces/SearchParams";
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
  "search/fetchArtists",
  async (searchParams: SearchParams) => {
    const response = await fetchArtists(searchParams);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArtistsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        var oldResults = [...state.value.results];
        if (action.payload.resultCount > 0) {
          state.value.results = oldResults.concat(action.payload.results);
          state.value.resultCount += action.payload.results.length;
        }
      });
  },
});

export const selectSearchResult = (state: RootState) => state.search.value;
export const selectSearchResultStatus = (state: RootState) =>
  state.search.status;

export default searchSlice.reducer;
