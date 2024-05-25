import React, { useState, useEffect } from "react";
import axios from "axios";

function DesenvolvedoresList({ desenvolvedores, onDelete }) {
  const [editedDevId, setEditedDevId] = useState(null);
  const [editedDev, setEditedDev] = useState({});

  const handleEdit = (dev) => {
    setEditedDevId(dev.id);
    setEditedDev({ ...dev });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3002/api/desenvolvedores/${editedDev.id}`, editedDev);
      setEditedDevId(null);
    } catch (error) {
      console.error("Erro ao editar o desenvolvedor:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/desenvolvedores/${id}`);
      onDelete(id);
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
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-4 bg-gray-600 rounded-md shadow-md">
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
          {desenvolvedores.map((dev) => (
            <tr key={dev.id} className="items-center justify-between w-full">
              <td className="text-white w-1/12">{dev.id}</td>
              <td className="w-3/12">
                {editedDevId === dev.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={editedDev.nome || ''}
                    onChange={handleChange}
                    className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-full"
                  />
                ) : (
                  <span className="text-white">{dev.nome}</span>
                )}
              </td>
              <td className="text-white w-2/12">{dev.sexo}</td>
              <td className="text-white w-2/12">{dev.data_nascimento}</td>
              <td className="text-white w-1/12">{dev.idade}</td>
              <td className="text-white w-2/12">{dev.hobby}</td>
              <td className="text-white w-1/12">{dev.nivel}</td>
              <td className="w-2/12">
                {editedDevId === dev.id ? (
                  <button
                    onClick={() => handleSave()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Salvar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(dev)}
                      className="bg-yellow-500 hover:bg-yellow-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(dev.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Excluir
                    </button>
                  </>
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
