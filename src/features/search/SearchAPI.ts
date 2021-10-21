import axios from "axios";
import { SearchParams } from "../../interfaces/SearchParams";
import { ApiResult } from "../../interfaces/SearchResult";

const baseUrl = "https://itunes.apple.com/search?";
const limit = 10;
interface GenericResult {
  data: ApiResult;
}

export const fetchArtists = async (
  searchParams: SearchParams
): Promise<GenericResult> => {
  const offsetParam =
    searchParams.offset && searchParams.offset !== 0
      ? `&offset=${searchParams.offset}`
      : "";
  return await axios.get(
    `${baseUrl}term=${searchParams.searchTerm}&media=music&limit=${limit}${offsetParam}`
  );
};
