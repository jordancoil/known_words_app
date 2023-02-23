import { Subtitle } from "../models/subtitle";
import { fetchData } from "./api_util";

// export async function fetchSubtitle(): Promise<Subtitle[]> {
//     const response = await fetchData("/api/media", { method: "GET" }); 
//     return response.json();
// }

export async function fetchSubtitlesForMedia(mediaId: string): Promise<Subtitle[]> {
    const response = await fetchData("/api/subtitles/" + mediaId, { method: "GET" });
    
    return response.json();
}