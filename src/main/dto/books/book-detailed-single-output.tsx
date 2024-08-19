export interface BookDetailedSingleOutput {
    readonly id: number;
    readonly name: string;
    readonly pictureUrl: string;
    readonly bookData: BookData;
}

export interface BookData {
    readonly genre: string;
    readonly about: string;
    readonly authorId: number;
}