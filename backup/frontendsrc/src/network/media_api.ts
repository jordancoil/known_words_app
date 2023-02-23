import { Media } from "../models/media";
import { fetchData } from "./api_util";

export async function fetchNotes(): Promise<Media[]> {
    const response = await fetchData("/api/notes", { method: "GET" }); 
    return response.json();
}

// export interface MediaInput {
//     title: string,
//     text?: string,
// }

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