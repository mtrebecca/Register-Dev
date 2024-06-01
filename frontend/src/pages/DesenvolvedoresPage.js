import React, { useState, useEffect } from "react";
import DesenvolvedoresForm from "../components/Desenvolvedores/DesenvolvedoresForm";
import DesenvolvedoresList from "../components/Desenvolvedores/DesenvolvedoresList";
import { fetchDesenvolvedores, cadastrarDesenvolvedor, editarDesenvolvedor, removerDesenvolvedor, fetchNiveis } from "../api/api";
import Swal from "sweetalert2";
import axios from 'axios';

function DesenvolvedoresPage() {
  const [desenvolvedores, setDesenvolvedores] = useState([]);
  const [editDesenvolvedorId, setEditDesenvolvedorId] = useState(null);
  const [niveis, setNiveis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const desenvolvedoresData = await fetchDesenvolvedores();
        setDesenvolvedores(desenvolvedoresData);
        const response = await axios.get('http://localhost:3002/api/niveis');
        setNiveis(response.data);
        setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Erro ao buscar dados",
          text: "Por favor, tente novamente.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddDesenvolvedor = async (desenvolvedor) => {
    try {
      if (editDesenvolvedorId !== null) {
        const updatedDesenvolvedor = await editarDesenvolvedor(editDesenvolvedorId, desenvolvedor);
        setDesenvolvedores(desenvolvedores.map((d) => d.id === editDesenvolvedorId ? updatedDesenvolvedor : d));
        setEditDesenvolvedorId(null);
      } else {
        const novoDesenvolvedor = await cadastrarDesenvolvedor(desenvolvedor);
        setDesenvolvedores([...desenvolvedores, novoDesenvolvedor]);
      }
      Swal.fire({
        icon: 'success',
        title: 'Desenvolvedor cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Erro ao adicionar/editar desenvolvedor:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar desenvolvedor',
        text: 'Por favor, tente novamente.',
      });
    }
  };

  const handleEditDesenvolvedor = (id) => {
    const desenvolvedor = desenvolvedores.find((d) => d.id === id);
    if (desenvolvedor) {
      setEditDesenvolvedorId(id);
    }
  };

  const handleDeleteDesenvolvedor = async (id) => {
    try {
      await removerDesenvolvedor(id);
      setDesenvolvedores(desenvolvedores.filter((d) => d.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Desenvolvedor excluído com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Erro ao remover desenvolvedor:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao excluir o desenvolvedor',
        text: 'Por favor, tente novamente.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-[#374151] p-8 rounded-lg shadow-lg">
        <div className="mb-4 flex text-center">
          <DesenvolvedoresForm onSubmit={handleAddDesenvolvedor} niveis={niveis} />
        </div>
        <div>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <DesenvolvedoresList
              desenvolvedores={desenvolvedores}
              onEdit={handleEditDesenvolvedor}
              onDelete={handleDeleteDesenvolvedor}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DesenvolvedoresPage;
