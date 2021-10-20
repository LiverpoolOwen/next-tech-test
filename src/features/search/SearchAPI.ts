import axios from "axios";
import { ApiResult } from "../../interfaces/SearchResult";

const baseUrl = "https://itunes.apple.com/search?"
const limit = 10;
interface GenericResult {
  data: ApiResult;
}


export const fetchArtists = async (searchTerm: string) : Promise<GenericResult> => {
  return await axios.get(`${baseUrl}term=${searchTerm}&media=music&limit=${limit}`);
}


