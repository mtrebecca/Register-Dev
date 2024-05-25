let niveis = [
  { id: 1, nivel: "Nível 1" },
  { id: 2, nivel: "Nível 2" },
  { id: 3, nivel: "Nível 3" }
];

exports.listarNiveis = (req, res) => {
  res.json(niveis);
};

exports.cadastrarNivel = (req, res) => {
  const { nivel } = req.body;
  const id = niveis.length + 1;
  const novoNivel = { id, nivel };
  niveis.push(novoNivel);
  res.status(201).json(novoNivel);
};

exports.editarNivel = (req, res) => {
  const id = parseInt(req.params.id);
  const { nivel } = req.body;
  const nivelIndex = niveis.findIndex(n => n.id === id);
  if (nivelIndex !== -1) {
    niveis[nivelIndex].nivel = nivel;
    res.json(niveis[nivelIndex]);
  } else {
    res.status(404).json({ error: 'Nível não encontrado' });
  }
};

exports.removerNivel = (req, res) => {
  const id = parseInt(req.params.id);
  const nivelIndex = niveis.findIndex(n => n.id === id);
  if (nivelIndex !== -1) {
    niveis.splice(nivelIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Nível não encontrado' });
  }
};
