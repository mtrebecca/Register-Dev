import React, { useState, useEffect } from "react";
import axios from "axios";

function DesenvolvedoresList({ desenvolvedores, onDelete }) {
  const [editedDevId, setEditedDevId] = useState(null);
  const [editedDev, setEditedDev] = useState({ nome: "", hobby: "" });
  const [devList, setDevList] = useState([]);

  useEffect(() => {
    setDevList(desenvolvedores);
  }, [desenvolvedores]);

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
    } catch (error) {
      console.error("Erro ao editar o desenvolvedor:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/desenvolvedores/${id}`);
      setDevList(devList.filter((dev) => dev.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o desenvolvedor:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDev((prevDev) => ({
      ...prevDev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full mx-auto p-4 bg-gray-600 rounded-md shadow-md">
      <h2 className="text-2xl font-sans font-bold text-white text-center mb-4">
        Lista de Desenvolvedores
      </h2>
      <table className="w-full justify-between">
        <thead>
          <tr>
            <th className="text-left text-white w-1/12">ID</th>
            <th className="text-left text-white w-3/12">Nome</th>
            <th className="text-left text-white w-2/12">Sexo</th>
            <th className="text-left text-white w-2/12">Data de Nascimento</th>
            <th className="text-left text-white w-1/12">Idade</th>
            <th className="text-left text-white w-2/12">Hobby</th>
            <th className="text-left text-white w-1/12">Nível</th>
            <th className="text-left text-white w-2/12">Ações</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {devList.map((dev) => (
            <tr key={dev.id} className="items-center justify-between w-full">
              <td className="text-white w-1/12">{dev.id}</td>
              <td className="w-3/12">
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
              <td className="text-white w-2/12">{dev.sexo}</td>
              <td className="text-white w-2/12">
                {new Date(dev.data_nascimento).toLocaleDateString()}
              </td>
              <td className="text-white w-1/12">{dev.idade}</td>{" "}
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
              <td className="text-white w-1/12">{dev.nivel}</td>
              <td className="w-2/12">
                {editedDevId === dev.id ? (
                  <button
                    onClick={handleSave}
                    className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md mr-2">
                    Salvar
                  </button>
                ) : (
                  <div className="flex">
                    <button
                      onClick={() => handleEdit(dev)}
                      className="bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md mr-2">
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(dev.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                      Excluir
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DesenvolvedoresList;
