let desenvolvedores = [
  {
    id: 1,
    nome: "Desenvolvedor 1",
    sexo: "M",
    data_nascimento: "1990-01-01",
    idade: 31,
    hobby: "Programação",
    nivel_id: 1,
  },
  {
    id: 2,
    nome: "Desenvolvedor 2",
    sexo: "F",
    data_nascimento: "1995-02-15",
    idade: 26,
    hobby: "Música",
    nivel_id: 2,
  },
];

let niveis = [
  { id: 1, nivel: "Júnior" },
  { id: 2, nivel: "Pleno" },
];

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

exports.desenvolvedores = desenvolvedores;
exports.niveis = niveis;

exports.listarDesenvolvedores = (req, res) => {
  const desenvolvedoresComNivel = desenvolvedores.map((dev) => {
    const nivel = niveis.find((n) => {
      return n.id === dev.nivel_id;
    });
    const desenvolvedorComDados = { 
      ...dev, 
      nivel: nivel ? nivel.nivel : "Nível não encontrado",
      idade: calcularIdade(dev.data_nascimento)
    };
    console.log("Desenvolvedor com dados:", desenvolvedorComDados);
    return desenvolvedorComDados;
  });
  console.log("Desenvolvedores retornados:", desenvolvedoresComNivel);
  res.json(desenvolvedoresComNivel);
};


exports.listarDesenvolvedoresFiltrados = (req, res) => {
  const query = req.query.q;
  if (query) {
    const desenvolvedoresFiltrados = desenvolvedores.filter(dev =>
      dev.nome.toLowerCase().includes(query.toLowerCase())
    );
    res.json(desenvolvedoresFiltrados);
  } else {
    res.json(desenvolvedores);
  }
};

exports.cadastrarDesenvolvedor = (req, res) => {
  console.log("Dados recebidos no endpoint cadastrarDesenvolvedor:", req.body);
  const { nivelId, nome, sexo, dataNascimento, hobby, idade } = req.body;
  const id = desenvolvedores.length + 1;

  const nivel = niveis.find((nivel) => nivel.id === parseInt(nivelId));
  const nomeDoNivel = nivel ? nivel.nivel : "Nível não encontrado 2";

  const novoDesenvolvedor = {
    id,
    nivel_id: nivelId,
    nome,
    sexo,
    data_nascimento: dataNascimento,
    idade,
    hobby,
    nivel: nomeDoNivel,
  };
  desenvolvedores.push(novoDesenvolvedor);
  res.status(201).json(novoDesenvolvedor);
};


exports.editarDesenvolvedor = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, sexo, data_nascimento, hobby, nivel_id } = req.body;
  const idade = calcularIdade(data_nascimento);
  const desenvolvedorIndex = desenvolvedores.findIndex((dev) => dev.id === id);
  if (desenvolvedorIndex !== -1) {
    desenvolvedores[desenvolvedorIndex] = {
      id,
      nivel_id,
      nome,
      sexo,
      data_nascimento,
      idade,
      hobby,
    };
    res.json(desenvolvedores[desenvolvedorIndex]);
  } else {
    res.status(404).json({ error: "Desenvolvedor não encontrado" });
  }
};

exports.removerDesenvolvedor = (req, res) => {
  const id = parseInt(req.params.id);
  const desenvolvedorIndex = desenvolvedores.findIndex((dev) => dev.id === id);
  if (desenvolvedorIndex !== -1) {
    desenvolvedores.splice(desenvolvedorIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: "Desenvolvedor não encontrado" });
  }
};
