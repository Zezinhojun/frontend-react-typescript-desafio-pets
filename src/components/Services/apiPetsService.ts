import axios from "axios"
import { IPet } from "../Interfaces/Pet"

const API_URL = "http://localhost:3000/api/pets"

//Create pet
export const createPet = async (petData: IPet, ownerId: string): Promise<IPet> => {
    try {
        const response = await axios.post(`${API_URL}/${ownerId}/create-new-pet`, petData)
        return response.data as IPet
    } catch (error) {
        console.error('Erro ao criar pets:', error);
        throw error
    }
}

//Read all Pet
export const getAllPets = async (): Promise<IPet[]> => {
    try {
        const response = await axios.get(`${API_URL}/`)
        return response.data as IPet[]
    } catch (error) {
        console.error('Erro ao buscar proprietários:', error);
        throw error;
    }
}

//Read one Pet
export const getOnePet = async (id: string): Promise<IPet | null> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`)
        return response.data as IPet
    } catch (error) {
        console.error('Erro ao buscar Pet:', error);
        throw new Error("Pet não encontrado.");
    }
}

//Update one pet
export const updatePet = async (id: string, updatedData: Partial<IPet>): Promise<IPet> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData)
        return response.data as IPet
    } catch (error) {
        console.error('Erro ao atualizar proprietário:', error);
        throw error;
    }
}

//Delete one pet

export const deletePet = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`)
    } catch (error) {
        console.error('Erro ao deletar proprietário:', error);
        throw error;
    }
}