import React, { useState, useEffect } from "react";
import DesenvolvedoresForm from "../components/Desenvolvedores/DesenvolvedoresForm";
import DesenvolvedoresList from "../components/Desenvolvedores/DesenvolvedoresList";
import {
  fetchDesenvolvedores,
  cadastrarDesenvolvedor,
  editarDesenvolvedor,
  removerDesenvolvedor,
  fetchNiveis,
} from "../api/api";

function DesenvolvedoresPage() {
  const [desenvolvedores, setDesenvolvedores] = useState([]);
  const [editDesenvolvedorId, setEditDesenvolvedorId] = useState(null);
  const [niveis, setNiveis] = useState([]);

  useEffect(() => {
    const getDesenvolvedores = async () => {
      const desenvolvedoresData = await fetchDesenvolvedores();
      setDesenvolvedores(desenvolvedoresData);
    };

    const getNiveis = async () => {
      try {
        const niveisData = await fetchNiveis();
        setNiveis(niveisData);
      } catch (error) {
        console.error("Erro ao buscar níveis:", error);
      }
    };

    getDesenvolvedores();
    getNiveis();
  }, []);

  const handleAddDesenvolvedor = async (desenvolvedor) => {
    try {
      if (editDesenvolvedorId !== null) {
        const updatedDesenvolvedor = await editarDesenvolvedor(
          editDesenvolvedorId,
          desenvolvedor
        );
        setDesenvolvedores(
          desenvolvedores.map((d) =>
            d.id === editDesenvolvedorId ? updatedDesenvolvedor : d
          )
        );
        setEditDesenvolvedorId(null);
      } else {
        const novoDesenvolvedor = await cadastrarDesenvolvedor(desenvolvedor);
        setDesenvolvedores([...desenvolvedores, novoDesenvolvedor]);
      }
    } catch (error) {
      console.error("Erro ao adicionar/editar desenvolvedor:", error);
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
    } catch (error) {
      console.error("Erro ao remover desenvolvedor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center py-8">
      <div className="w-full max-w-4xl bg-[#374151] p-8 rounded-lg shadow-lg">
        <div className="mb-4 flex text-center">
          <DesenvolvedoresForm
            onSubmit={handleAddDesenvolvedor}
            niveis={niveis}
          />
        </div>
        <div>
          <DesenvolvedoresList
            desenvolvedores={desenvolvedores}
            onEdit={handleEditDesenvolvedor}
            onDelete={handleDeleteDesenvolvedor}
          />
        </div>
      </div>
    </div>
  );
}

export default DesenvolvedoresPage;
