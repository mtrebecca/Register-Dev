import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/Listas.css";

function DesenvolvedoresList({ desenvolvedores, onDelete }) {
  const [editedDevId, setEditedDevId] = useState(null);
  const [editedDev, setEditedDev] = useState({ nome: "", hobby: "" });
  const [devList, setDevList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    setDevList(desenvolvedores);
  }, [desenvolvedores]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/api/desenvolvedores`,
          {
            params: { q: searchQuery },
          }
        );
        const data = response.data.filter((dev) => {
          return Object.values(dev).some((value) => {
            if (value !== null && value !== undefined) {
              return value
                .toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            }
            return false;
          });
        });
        setDevList(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: 'Erro ao buscar desenvolvedores"',
          text: "Por favor, tente novamente.",
        });
      }
    };
    if (searchQuery.trim() !== "") {
      fetchDevelopers();
    } else {
      setDevList(desenvolvedores);
    }
  }, [searchQuery, desenvolvedores]);

  const handleEdit = (dev) => {
    setEditedDevId(dev.id);
    setEditedDev({ nome: dev.nome, hobby: dev.hobby });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3002/api/desenvolvedores/${editedDevId}`,
        editedDev
      );
      setDevList((prevDevs) =>
        prevDevs.map((dev) =>
          dev.id === editedDevId
            ? { ...dev, nome: editedDev.nome, hobby: editedDev.hobby }
            : dev
        )
      );
      setEditedDevId(null);
      Swal.fire({
        icon: "success",
        title: "Desenvolvedor atualizado com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao editar o desenvolvedor",
        text: "Por favor, tente novamente.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/desenvolvedores/${id}`);
      setDevList(devList.filter((dev) => dev.id !== id));
      Swal.fire({
        icon: "success",
        title: "Desenvolvedor excluído com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao excluir o desenvolvedor",
        text: "Por favor, tente novamente.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDev((prevDev) => ({
      ...prevDev,
      [name]: value,
    }));
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedList = [...devList].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setDevList(sortedList);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDevList = devList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full mx-auto p-4 bg-gray-600 rounded-md shadow-md">
      <h2 className="text-2xl font-sans font-bold text-white text-center mb-4">
        Lista de Desenvolvedores
      </h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar desenvolvedor..."
        className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-full"
      />
      {devList.length === 0 ? (
        <p className="text-white text-center">Nenhum resultado encontrado.</p>
      ) : (
        <>
          <table className="w-full justify-between">
            <thead>
              <tr>
                <th
                  className="text-left text-white w-1/12 cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  ID
                </th>
                <th
                  className="text-left text-white w-2/12 cursor-pointer"
                  onClick={() => handleSort("nome")}
                >
                  Nome
                </th>
                <th
                  className="text-left text-white w-1/12 cursor-pointer"
                  onClick={() => handleSort("sexo")}
                >
                  Sexo
                </th>
                <th
                  className="text-left text-white w-2/12 cursor-pointer"
                  onClick={() => handleSort("data_nascimento")}
                >
                  Data de Nascimento
                </th>
                <th
                  className="text-left text-white w-1/12 cursor-pointer"
                  onClick={() => handleSort("idade")}
                >
                  Idade
                </th>
                <th
                  className="text-left text-white w-2/12 cursor-pointer"
                  onClick={() => handleSort("hobby")}
                >
                  Hobby
                </th>
                <th
                  className="text-left text-white w-2/12 cursor-pointer"
                  onClick={() => handleSort("nivel")}
                >
                  Nível
                </th>
                <th className="text-left text-white w-1/12">Ações</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {currentDevList.map((dev) => (
                <tr
                  key={dev.id}
                  className="items-center justify-between w-full"
                >
                  <td className="text-white w-1/12">{dev.id}</td>
                  <td className="w-2/12">
                    {editedDevId === dev.id ? (
                      <input
                        type="text"
                        name="nome"
                        value={editedDev.nome}
                        onChange={handleChange}
                        className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-full"
                      />
                    ) : (
                      <span className="text-white">{dev.nome}</span>
                    )}
                  </td>
                  <td className="text-white w-1/12">{dev.sexo}</td>
                  <td className="text-white w-2/12">
                    {new Date(dev.data_nascimento).toLocaleDateString()}
                  </td>
                  <td className="text-white w-1/12">{dev.idade}</td>
                  <td className="w-2/12">
                    {editedDevId === dev.id ? (
                      <input
                        type="text"
                        name="hobby"
                        value={editedDev.hobby}
                        onChange={handleChange}
                        className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-full"
                      />
                    ) : (
                      <span className="text-white">{dev.hobby}</span>
                    )}
                  </td>
                  <td className="text-white w-2/12">{dev.nivel}</td>
                  <td className="w-1/12">
                    {editedDevId === dev.id ? (
                      <button
                        onClick={handleSave}
                        className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Salvar
                      </button>
                    ) : (
                      <div className="flex">
                        <button
                          onClick={() => handleEdit(dev)}
                          className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(dev.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center w-full">
            {devList.length > itemsPerPage && (
              <nav className="flex w-full justify-center">
                <ul className="pagination flex">
                  {[...Array(Math.ceil(devList.length / itemsPerPage))].map(
                    (_, index) => (
                      <li key={index} className="page-item">
                        <button
                          onClick={() => paginate(index + 1)}
                          className="page-link text-white"
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DesenvolvedoresList;
