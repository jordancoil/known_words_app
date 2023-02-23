import { Media } from "./media"

export interface Collection {
    _id: string,
    title: string,
    description?: string,
    media: Media[],
    imgFile?: string,
    type: string,
    createdAt: string,
    updatedAt: string,
}