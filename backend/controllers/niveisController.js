let niveis = [
  { id: 1, nivel: "Júnior" },
  { id: 2, nivel: "Pleno" },
];

exports.listarNiveis = (req, res) => {
  const query = req.query.q;
  if (query) {
    const niveisFiltrados = niveis.filter(nivel =>
      nivel.nivel.toLowerCase().includes(query.toLowerCase())
    );
    res.json(niveisFiltrados);
  } else {
    res.json(niveis);
  }
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
