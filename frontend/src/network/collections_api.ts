import { Collection } from "../models/collections";
import { fetchData } from "./api_util";

export async function fetchCollections(): Promise<Collection[]> {
    const response = await fetchData("/api/collections", { method: "GET" }); 
    return response.json();
}