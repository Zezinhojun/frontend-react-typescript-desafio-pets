export interface IPet {
    id?: string;
    name: string | undefined;
    breed: string | undefined;
    age: number | undefined;
    image?: string | undefined | null
    ownerId: string | undefined
}