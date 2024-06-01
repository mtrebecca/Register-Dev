const axios = require("axios");

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

async function obterNiveis() {
  try {
    const response = await axios.get("http://localhost:3002/api/niveis");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter níveis:", error);
    return [];
  }
}

exports.listarDesenvolvedores = async (req, res) => {
  const niveis = await obterNiveis();
  const desenvolvedoresComNivel = desenvolvedores.map((dev) => {
    const nivel = niveis.find((n) => n.id === dev.nivel_id);
    const desenvolvedorComDados = {
      ...dev,
      nivel: nivel ? nivel.nivel : "Nível não encontrado",
      idade: calcularIdade(dev.data_nascimento),
    };
    return desenvolvedorComDados;
  });
  res.json(desenvolvedoresComNivel);
};

exports.listarDesenvolvedoresFiltrados = async (req, res) => {
  const query = req.query.q;
  if (query) {
    const desenvolvedoresFiltrados = desenvolvedores.filter((dev) =>
      dev.nome.toLowerCase().includes(query.toLowerCase())
    );
    res.json(desenvolvedoresFiltrados);
  } else {
    res.json(desenvolvedores);
  }
};

exports.listarNiveis = async (req, res) => {
  const niveis = await obterNiveis();
  res.json(niveis);
};

exports.cadastrarDesenvolvedor = async (req, res) => {
  console.log("Dados recebidos para cadastro:", req.body);
  const { nivelId, nome, sexo, dataNascimento, hobby } = req.body;

  if (!nivelId || !nome || !sexo || !dataNascimento || !hobby) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const niveis = await obterNiveis();
  const nivelExistente = niveis.find((nivel) => nivel.id === parseInt(nivelId));
  if (!nivelExistente) {
    return res
      .status(400)
      .json({
        error: "O ID do nível não corresponde a nenhum nível existente",
      });
  }

  const idade = calcularIdade(dataNascimento);
  const id = desenvolvedores.length + 1;
  const novoDesenvolvedor = {
    id,
    nivel_id: nivelId,
    nome,
    sexo,
    data_nascimento: dataNascimento,
    idade,
    hobby,
    nivel: nivelExistente.nivel,
  };
  desenvolvedores.push(novoDesenvolvedor);

  res.status(201).json({
    id,
    nivel_id: nivelId,
    nome,
    sexo,
    data_nascimento: dataNascimento,
    idade,
    hobby,
    nivel: nivelExistente.nivel,
    niveis,
  });
};

exports.editarDesenvolvedor = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, sexo, data_nascimento, hobby, nivel_id } = req.body;

  if (!nome || !sexo || !data_nascimento || !hobby || !nivel_id) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const niveis = await obterNiveis();
  const nivelExistente = niveis.find(
    (nivel) => nivel.id === parseInt(nivel_id)
  );
  if (!nivelExistente) {
    return res
      .status(400)
      .json({
        error: "O ID do nível não corresponde a nenhum nível existente",
      });
  }

  const idade = calcularIdade(data_nascimento);
  const desenvolvedor = desenvolvedores.find((dev) => dev.id === id);
  if (desenvolvedor) {
    desenvolvedor.nome = nome;
    desenvolvedor.sexo = sexo;
    desenvolvedor.data_nascimento = data_nascimento;
    desenvolvedor.hobby = hobby;
    desenvolvedor.nivel_id = nivel_id;
    desenvolvedor.idade = idade;
    desenvolvedor.nivel = nivelExistente.nivel;

    res.json({ desenvolvedor, niveis });
  } else {
    res.status(404).json({ error: "Desenvolvedor não encontrado" });
  }
};

exports.removerDesenvolvedor = (req, res) => {
  const id = parseInt(req.params.id);
  const index = desenvolvedores.findIndex((dev) => dev.id === id);
  if (index !== -1) {
    desenvolvedores.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: "Desenvolvedor não encontrado" });
  }
};
