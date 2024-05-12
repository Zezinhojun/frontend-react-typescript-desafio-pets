
export interface IOwner {
    id?: string;
    name: string | undefined;
    phoneNumber: string | undefined;
    pets?: Array<{ id: string; name: string; breed: string }>;

    // Adicione outros campos conforme necessário
}