const desenvolvedoresController = require('./desenvolvedoresController');

exports.listarDesenvolvedoresPorNivel = (req, res) => {
  const nivelId = parseInt(req.params.nivelId);
  const desenvolvedoresAssociados = desenvolvedoresController.desenvolvedores.filter((dev) => dev.nivel_id === nivelId);
  res.json(desenvolvedoresAssociados);
};

exports.listarNiveisComQuantidade = (req, res) => {
    const niveis = desenvolvedoresController.niveis;
    const desenvolvedores = desenvolvedoresController.desenvolvedores;
  
    console.log("Níveis:", niveis);
    console.log("Desenvolvedores:", desenvolvedores);
  
    if (!niveis || !desenvolvedores) {
      return res.status(500).json({ error: "Dados não carregados corretamente." });
    }
  
    const niveisComQuantidade = niveis.map((nivel) => {
      const quantidade = desenvolvedores.filter((dev) => dev.nivel_id === nivel.id).length;
      return {
        ...nivel,
        quantidadeDesenvolvedores: quantidade,
      };
    });
  
    res.json(niveisComQuantidade);
  };
  