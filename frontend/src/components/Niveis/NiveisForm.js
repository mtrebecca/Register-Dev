import React, { useState } from "react";
import Swal from "sweetalert2";

function NiveisForm({ onSubmit }) {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nivel = e.target.nivel.value.trim();
    if (!nivel) {
      setError("Por favor, preencha o campo Nível.");
      return;
    }
    try {
      await onSubmit(nivel);
      setError(null);
      Swal.fire({
        icon: "success",
        title: "Nível salvo com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();
    } catch (error) {
      setError("Erro ao salvar o nível. Por favor, tente novamente.");
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar o nível",
        text: "Por favor, tente novamente.",
      });
    }
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-4 bg-gray-600 rounded-md shadow-md">
      <h1 className="text-2xl font-sans font-bold text-white mb-4">Níveis</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="nivel" className="text-white mb-2 w-64 text-left">
          Nível:
        </label>
        <input
          type="text"
          id="nivel"
          name="nivel"
          required
          className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-64"
        />
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md w-64">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default NiveisForm;
