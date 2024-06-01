import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002/api",
});

export const fetchNiveis = async () => {
  try {
    const response = await api.get("/niveis");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar níveis:", error);
    throw error;
  }
};

export const addNivel = async (nivel) => {
  try {
    const response = await api.post("/niveis", { nivel });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar nível:", error);
    throw error;
  }
};

export const updateNivel = async (id, nivel) => {
  try {
    const response = await api.put(`/niveis/${id}`, { nivel });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar nível:", error);
    throw error;
  }
};

export const deleteNivel = async (id) => {
  try {
    await api.delete(`/niveis/${id}`);
  } catch (error) {
    console.error("Erro ao remover nível:", error);
    throw error;
  }
};

export const fetchDesenvolvedores = async () => {
  try {
    const response = await api.get("/desenvolvedores");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar desenvolvedores:", error);
    throw error;
  }
};

export const cadastrarDesenvolvedor = async (desenvolvedor) => {
  try {
    const response = await api.post("/desenvolvedores", desenvolvedor);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar desenvolvedor:", error);
    throw error;
  }
};

export const editarDesenvolvedor = async (id, desenvolvedor) => {
  try {
    const response = await api.put(`/desenvolvedores/${id}`, desenvolvedor);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar desenvolvedor:", error);
    throw error;
  }
};

export const removerDesenvolvedor = async (id) => {
  try {
    await api.delete(`/desenvolvedores/${id}`);
  } catch (error) {
    console.error("Erro ao remover desenvolvedor:", error);
    throw error;
  }
};
