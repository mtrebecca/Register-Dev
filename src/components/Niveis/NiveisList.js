import React, { useState, useEffect } from "react";
import axios from "axios";

function NiveisList({ niveis, onDelete }) {
  const [niveisList, setNiveisList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedNivelId, setEditedNivelId] = useState(null);
  const [editedNivel, setEditedNivel] = useState("");

  useEffect(() => {
    setNiveisList(niveis);
    const fetchNiveis = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/niveis?q=${searchQuery}`);
        const data = response.data;
        setNiveisList(data);
      } catch (error) {
        console.error("Erro ao buscar níveis:", error);
      }
    };

    fetchNiveis();
  }, [niveis, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (id, nivel) => {
    setEditedNivelId(id);
    setEditedNivel(nivel);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:3002/api/niveis/${id}`, {
        nivel: editedNivel,
      });
      setEditedNivelId(null);
      setNiveisList((prevNiveis) =>
        prevNiveis.map((n) => (n.id === id ? { ...n, nivel: editedNivel } : n))
      );
    } catch (error) {
      console.error("Erro ao editar o nível:", error);
    }
  };

  const handleChange = (e) => {
    setEditedNivel(e.target.value);
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-4 bg-gray-600 rounded-md shadow-md">
      <h2 className="text-2xl font-sans font-bold text-white text-center mb-4">
        Lista de Níveis
      </h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar nível..."
        className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-full"
      />
      <table className="w-full justify-between">
        <thead>
          <tr>
            <th className="text-left text-white w-1/12">ID</th>
            <th className="text-left text-white w-4/12">Nível</th>
            <th className="text-left text-white w-6/12">Ações</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {niveisList.map((nivel, index) => (
            <tr key={index} className="items-center justify-between w-full">
              <td className="text-white w-1/12">{nivel.id}</td>
              <td>
                {editedNivelId === nivel.id ? (
                  <input
                    type="text"
                    value={editedNivel}
                    onChange={handleChange}
                    className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-48"
                  />
                ) : (
                  <span className="text-white">{nivel.nivel}</span>
                )}
              </td>
              <td>
                {editedNivelId === nivel.id ? (
                  <button
                    onClick={() => handleSave(nivel.id)}
                    className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md mr-2">
                    Salvar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(nivel.id, nivel.nivel)}
                      className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md mr-2">
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(nivel.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                      Excluir
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {niveisList.length === 0 && (
            <tr>
              <td colSpan="3" className="text-white text-center">
                Nenhum resultado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NiveisList;
