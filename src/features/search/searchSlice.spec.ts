import searchReducer, { SearchState, fetchArtistsAsync } from "./searchSlice";
import { GenericResult } from "../../interfaces/GenericResult";
import { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import { SearchParams } from "../../interfaces/SearchParams";
import { ApiResult } from "../../interfaces/SearchResult";
import { fetchArtists } from "./SearchAPI";

jest.mock('./SearchAPI');

describe("search reducer", () => {
  let fetchArtistsMock: jest.MockedFunction<typeof fetchArtists>;

  beforeAll(() => {
    fetchArtistsMock = fetchArtists as any;
  });

  afterAll(() => {
    jest.unmock("./SearchAPI");
  });

  const initialState: SearchState = {
    value: { resultCount: 0, results: [] },
    status: "idle",
  };

  it("should handle initial state", () => {
    expect(searchReducer(undefined, { type: "unknown" })).toEqual({
      value: { resultCount: 0, results: [] },
      status: "idle",
    });
  });

  describe("search", () => {
    let action: AsyncThunkAction<ApiResult, SearchParams, {}>;

    let dispatch: Dispatch;
    let getState: () => unknown;

    let arg: SearchParams;
    let result: GenericResult;

    beforeEach(() => {
      // initialize new spies
      dispatch = jest.fn();
      getState = jest.fn();

      arg = { searchTerm: "test", offset: 2 };
      action = fetchArtistsAsync(arg);
    });

    // Test that our thunk is calling the API using the arguments we expect
    it("calls the api correctly", async () => {
      await action(dispatch, getState, undefined);
      expect(fetchArtistsMock).toHaveBeenCalledWith(arg);
    });
  });
});
