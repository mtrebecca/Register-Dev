import React, { useState, useEffect } from "react";
import NiveisForm from "../components/Niveis/NiveisForm";
import NiveisList from "../components/Niveis/NiveisList";
import { fetchNiveis, addNivel, updateNivel, deleteNivel } from "../api/api";
import Swal from "sweetalert2";

function NiveisPage() {
  const [niveis, setNiveis] = useState([]);
  const [editNivelId, setEditNivelId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNiveis = async () => {
      try {
        const niveisData = await fetchNiveis();
        setNiveis(niveisData);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar níveis:", error);
        setError("Erro ao buscar níveis. Por favor, tente novamente.");
      }
    };

    getNiveis();
  }, []);

  const handleAddNivel = async (nivel) => {
    try {
      if (editNivelId !== null) {
        const updatedNivel = await updateNivel(editNivelId, nivel);
        setNiveis(niveis.map((n) => (n.id === editNivelId ? updatedNivel : n)));
        setEditNivelId(null);
      } else {
        const novoNivel = await addNivel(nivel);
        setNiveis([...niveis, novoNivel]);
      }
      setError(null);
    } catch (error) {
      console.error("Erro ao adicionar/editar nível:", error);
      setError("Erro ao adicionar/editar nível. Por favor, tente novamente.");
    }
  };

  const handleEditNivel = (id) => {
    const nivel = niveis.find((n) => n.id === id);
    if (nivel) {
      setEditNivelId(id);
      document.getElementById("nivel").value = nivel.nivel;
    }
  };
  const handleDeleteNivel = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3002/api/desenvolvedoresNiveis/niveisComQuantidade"
      );
      if (!response.ok) {
        throw new Error(
          "Erro ao buscar quantidades de desenvolvedores por nível"
        );
      }
      const niveisComQuantidade = await response.json();

      console.log("Níveis com Quantidade:", niveisComQuantidade);

      const nivel = niveisComQuantidade.find((n) => n.id === id);
      if (nivel && nivel.quantidadeDesenvolvedores > 0) {
        Swal.fire({
          icon: "error",
          title: "Não é possível excluir",
          text: "Não é possível excluir o nível, pois existem desenvolvedores associados a ele.",
        });
        return;
      }

      await deleteNivel(id);
      setNiveis(niveis.filter((n) => n.id !== id));

      Swal.fire({
        icon: "success",
        title: "Nível excluído",
        text: "O nível foi excluído com sucesso.",
      });
      setError(null); 
    } catch (error) {
      console.error("Erro ao remover nível:", error);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Ocorreu um erro ao remover o nível.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center">
      <div className="w-full max-w-4xl bg-[#374151] p-8 rounded-lg shadow-lg">
        <div className="mb-4 flex text-center">
          <NiveisForm onSubmit={handleAddNivel} />
        </div>
        <div>
          <NiveisList
            niveis={niveis}
            onEdit={handleEditNivel}
            onDelete={handleDeleteNivel}
          />
        </div>
      </div>
    </div>
  );
}

export default NiveisPage;
