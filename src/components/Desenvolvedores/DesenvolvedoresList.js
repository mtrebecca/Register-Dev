import React from 'react';

function DesenvolvedoresList({ desenvolvedores }) {
  return (
    <div>
      <h2>Lista de Desenvolvedores</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Idade</th>
            <th>Hobby</th>
            <th>Nível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {desenvolvedores.map(dev => (
            <tr key={dev.id}>
              <td>{dev.id}</td>
              <td>{dev.nome}</td>
              <td>{dev.sexo}</td>
              <td>{dev.data_nascimento}</td>
              <td>{dev.idade}</td>
              <td>{dev.hobby}</td>
              <td>{dev.nivel}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DesenvolvedoresList;
