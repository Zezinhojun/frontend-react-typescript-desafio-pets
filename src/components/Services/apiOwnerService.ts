import axios from 'axios'

const API_URL = "http://localhost:3000/api/owners"
import { IOwner } from '../Interfaces/Owner'
import { IPet } from '../Interfaces/Pet'


//Create Owner
export const createOwner = async (ownerData: IOwner): Promise<IOwner> => {
    try {
        const response = await axios.post(`${API_URL}/create-new-owner`, ownerData)
        return response.data as IOwner
    } catch (error) {
        console.error('Erro ao criar proprietário:', error);
        throw error;
    }
}

//Read all Owner
export const getAllOwners = async (): Promise<IOwner[]> => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data as IOwner[];
    } catch (error) {
        console.error('Erro ao buscar proprietários:', error);
        throw error;
    }
};

//Read One Owner
export const getOneOwner = async (id: string): Promise<IOwner | null> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data as IOwner;
    } catch (error) {
        console.error('Erro ao buscar proprietário:', error);
        throw new Error("Proprietário não encontrado.");
    }
};

//Update one Owner

export const updateOwner = async (id: string, updatedData: Partial<IOwner>): Promise<IOwner> => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data as IOwner;
    } catch (error) {
        console.error('Erro ao atualizar proprietário:', error);
        throw error;
    }
};

//Delete one Owner

export const deleteOwner = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Erro ao deletar proprietário:', error);
        throw error;
    }
};

//Read all pets of Owner

export const getAllPetsOfOwner = async (id: string): Promise<IPet[]> => {
    try {
        const response = await axios.get(`${API_URL}/${id}/pets`);
        return response.data as IPet[];
    } catch (error) {
        console.error('Erro ao buscar pets do proprietário:', error);
        throw error;
    }
};