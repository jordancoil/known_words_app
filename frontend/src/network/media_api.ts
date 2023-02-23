import { Media } from "../models/media";
import { fetchData } from "./api_util";

export async function fetchMedia(): Promise<Media[]> {
    const response = await fetchData("/api/media", { method: "GET" }); 
    return response.json();
}

export interface MediaInput {
    title: string,
    description?: string,
    subtitleFile?: string,
    imgFile?: string,
}

export async function fetchAllMediaForCollection(collectionId: string): Promise<Media[]> {
    const response = await fetchData("/api/media/" + collectionId, { method: "GET" });
    
    return response.json();
}

// export async function createNote(note: NoteInput): Promise<Note> {
//     const response = await fetchData("/api/notes", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(note),
//     });
    
//     return response.json();
// }

// export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
//     const response = await fetchData("/api/notes/" + noteId, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(note),
//     });
    
//     return response.json();
// }

// export async function deleteNote(noteId: string) {
//     await fetchData("/api/notes/" + noteId, { method: "DELETE" });
// }