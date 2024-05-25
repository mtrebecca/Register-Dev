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
    <div>
      <h2>Cadastrar Desenvolvedor</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default DesenvolvedoresForm;
