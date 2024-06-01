import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import calcularIdade from '../../utils/calcularIdade';

function DesenvolvedoresForm({ onSubmit, niveis }) {
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nome = e.target.nome.value;
      const sexo = e.target.sexo.value;
      const dataNascimento = e.target.dataNascimento.value;
      const hobby = e.target.hobby.value;
      const nivelId = parseInt(e.target.nivelId.value);

      if (!nome || !sexo || !dataNascimento || !hobby || !nivelId) {
        setError("Por favor, preencha todos os campos.");
        return;
      } 
  
      const nivel = niveis.find((nivel) => {
        return nivel.id === parseInt(nivelId);
      })?.nivel || "Nível não encontrado";
     
      const idade = calcularIdade(dataNascimento);
    
      await onSubmit({ nome, sexo, dataNascimento, hobby, nivelId, nivel: nivel, idade });
      setError(null);
      Swal.fire({
        icon: 'success',
        title: 'Desenvolvedor cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      });
      formRef.current.reset();
    } catch (error) {
      setError("Erro ao cadastrar desenvolvedor. Por favor, tente novamente.");
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar desenvolvedor',
        text: 'Por favor, tente novamente.',
      });
    }
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-4 bg-gray-600 rounded-md shadow-md">
      <h1 className="text-2xl font-sans font-bold text-white mb-4">Cadastrar Desenvolvedor</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="nome" className="text-white mb-2 w-64 text-left">
          Nome:
        </label>
        <input type="text" id="nome" name="nome" required className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-64" />
        
        <label htmlFor="sexo" className="text-white mb-2 w-64 text-left">
          Sexo:
        </label>
        <select id="sexo" name="sexo" required className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-64">
          <option value="M">M</option>
          <option value="F">F</option>
          <option value="Outro">Outro</option>
        </select>
        
        <label htmlFor="dataNascimento" className="text-white mb-2 w-64 text-left">
          Data de Nascimento:
        </label>
        <input type="date" id="dataNascimento" name="dataNascimento" required className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-64" />
        
        <label htmlFor="hobby" className="text-white mb-2 w-64 text-left">
          Hobby:
        </label>
        <input type="text" id="hobby" name="hobby" required className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-64" />
        
        <label htmlFor="nivelId" className="text-white mb-2 w-64 text-left">
          Nível:
        </label>
        <select id="nivelId" name="nivelId" required className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-64">
          {niveis.map(nivel => (
            <option key={nivel.id} value={nivel.id}>{nivel.nivel}</option>
          ))}
        </select>
        
        <button type="submit" className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md w-64">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default DesenvolvedoresForm;
