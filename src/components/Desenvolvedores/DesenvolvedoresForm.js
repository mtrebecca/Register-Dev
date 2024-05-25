import React from 'react';

function DesenvolvedoresForm({ onSubmit, niveis }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const nome = e.target.nome.value;
    const sexo = e.target.sexo.value;
    const dataNascimento = e.target.dataNascimento.value;
    const hobby = e.target.hobby.value;
    const nivelId = e.target.nivelId.value;
    onSubmit({ nome, sexo, dataNascimento, hobby, nivelId });
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 mx-auto p-4 bg-gray-600 rounded-md shadow-md">
      <h1 className="text-2xl font-sans font-bold text-white mb-4">Cadastrar Desenvolvedor</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="nome" className="text-white mb-2 w-64 text-left">
          Nome:
        </label>
        <input type="text" id="nome" name="nome" required className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-64" />
        
        <label htmlFor="sexo" className="text-white mb-2 w-64 text-left">
          Sexo:
        </label>
        <select id="sexo" name="sexo" required className="px-4 py-2 mb-4 rounded-md shadow-sm bg-gray-700 text-white w-64">
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
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
