import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002/api',
});

export const fetchNiveis = async () => {
  try {
    const response = await api.get('/niveis');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar níveis:', error);
    throw error;
  }
};

export const addNivel = async (nivel) => {
  try {
    const response = await api.post('/niveis', { nivel });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar nível:', error);
    throw error;
  }
};

export const updateNivel = async (id, nivel) => {
  try {
    const response = await api.put(`/niveis/${id}`, { nivel });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar nível:', error);
    throw error;
  }
};

export const deleteNivel = async (id) => {
  try {
    await api.delete(`/niveis/${id}`);
  } catch (error) {
    console.error('Erro ao remover nível:', error);
    throw error;
  }
};
