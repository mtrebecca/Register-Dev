let desenvolvedores = [
    { id: 1, nome: "Desenvolvedor 1", sexo: "M", data_nascimento: "1990-01-01", idade: 31, hobby: "Programação", nivel_id: 1 },
    { id: 2, nome: "Desenvolvedor 2", sexo: "F", data_nascimento: "1995-02-15", idade: 26, hobby: "Música", nivel_id: 2 }
  ];
  
  exports.listarDesenvolvedores = (req, res) => {
    res.json(desenvolvedores);
  };
  
  exports.cadastrarDesenvolvedor = (req, res) => {
    const { nivel_id, nome, sexo, data_nascimento, hobby } = req.body;
    const id = desenvolvedores.length + 1;
    const novoDesenvolvedor = { id, nivel_id, nome, sexo, data_nascimento, hobby };
    desenvolvedores.push(novoDesenvolvedor);
    res.status(201).json(novoDesenvolvedor);
  };
  
  exports.editarDesenvolvedor = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, sexo, data_nascimento, hobby, nivel_id } = req.body;
    const desenvolvedorIndex = desenvolvedores.findIndex(dev => dev.id === id);
    if (desenvolvedorIndex !== -1) {
      desenvolvedores[desenvolvedorIndex] = { id, nivel_id, nome, sexo, data_nascimento, hobby };
      res.json(desenvolvedores[desenvolvedorIndex]);
    } else {
      res.status(404).json({ error: 'Desenvolvedor não encontrado' });
    }
  };
  
  exports.removerDesenvolvedor = (req, res) => {
    const id = parseInt(req.params.id);
    const desenvolvedorIndex = desenvolvedores.findIndex(dev => dev.id === id);
    if (desenvolvedorIndex !== -1) {
      desenvolvedores.splice(desenvolvedorIndex, 1);
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Desenvolvedor não encontrado' });
    }
  };
  