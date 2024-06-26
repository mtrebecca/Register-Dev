import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/Listas.css";

function NiveisList({ niveis, onDelete }) {
  const [niveisList, setNiveisList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedNivelId, setEditedNivelId] = useState(null);
  const [editedNivel, setEditedNivel] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const fetchNiveisQuantidade = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/desenvolvedoresNiveis/niveisComQuantidade");
      const data = response.data;
      setNiveisList(data);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar níveis:", error);
      setError("Erro ao buscar níveis. Por favor, tente novamente.");
      Swal.fire({
        icon: "error",
        title: "Erro ao buscar níveis",
        text: "Por favor, tente novamente.",
      });
    }
  };
  


  useEffect(() => {
    setNiveisList(niveis);
    fetchNiveisQuantidade();
    const fetchNiveis = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/niveis?q=${searchQuery}`
        );
        const data = response.data;
        setNiveisList(data);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar níveis:", error);
        setError("Erro ao buscar níveis. Por favor, tente novamente.");
        Swal.fire({
          icon: "error",
          title: "Erro ao buscar níveis",
          text: "Por favor, tente novamente.",
        });
      }
    };
    if (searchQuery) {
      fetchNiveis();
    }
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
      setError(null);
      Swal.fire({
        icon: "success",
        title: "Nível editado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError("Erro ao editar o nível. Por favor, tente novamente.");
      Swal.fire({
        icon: "error",
        title: "Erro ao editar o nível",
        text: "Por favor, tente novamente.",
      });
    }
  };

  const handleChange = (e) => {
    setEditedNivel(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/niveis/${id}`);
      setNiveisList(niveisList.filter((nivel) => nivel.id !== id));
      Swal.fire({
        icon: "success",
        title: "Nível excluído com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError("Erro ao excluir o nível. Por favor, tente novamente.");
      Swal.fire({
        icon: "error",
        title: "Erro ao excluir o nível",
        text: "Por favor, tente novamente.",
      });
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedList = [...niveisList].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setNiveisList(sortedList);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = niveisList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full justify-between">
        <thead>
          <tr>
            <th className="text-left text-white w-1/12 cursor-pointer" onClick={() => handleSort('id')}>ID</th>
            <th className="text-left text-white w-4/12 cursor-pointer" onClick={() => handleSort('nivel')}>Nível</th>
            <th className="text-left text-white w-4/12 cursor-pointer">Devs Associados</th>
            <th className="text-left text-white w-6/12">Ações</th>
          </tr>
        </thead>
       <tbody className="w-full">
  {currentItems.map((nivel, index) => (
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
      <td className="text-white w-2/12">{nivel.quantidadeDesenvolvedores}</td>
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
              onClick={() => handleDelete(nivel.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              Excluir
            </button>
          </>
        )}
      </td>
    </tr>
  ))}
  {currentItems.length === 0 && (
    <tr>
      <td colSpan="3" className="text-white text-center">
        Nenhum resultado encontrado.
      </td>
    </tr>
  )}
</tbody>
      </table>
      <div className="flex justify-center w-full">
        {niveisList.length > itemsPerPage && (
          <nav className="flex w-full justify-center">
            <ul className="pagination flex">
              {[...Array(Math.ceil(niveisList.length / itemsPerPage))].map(
                (_, index) => (
                  <li key={index} className="page-item">
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link text-white">
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default NiveisList;
