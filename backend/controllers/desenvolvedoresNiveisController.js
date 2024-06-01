const axios = require('axios');

exports.listarDesenvolvedoresPorNivel = async (req, res) => {
  const nivelId = parseInt(req.params.nivelId);

  try {
    const desenvolvedoresResponse = await axios.get('http://localhost:3002/api/desenvolvedoresPorNivel');
    const desenvolvedores = desenvolvedoresResponse.data;

    const desenvolvedoresAssociados = desenvolvedores.filter((dev) => dev.nivel_id === nivelId);
    res.json(desenvolvedoresAssociados);
  } catch (error) {
    console.error('Erro ao buscar desenvolvedores:', error);
    res.status(500).json({ error: 'Erro ao buscar desenvolvedores' });
  }
};

exports.listarNiveisComQuantidade = async (req, res) => {
  try {
    const niveisResponse = await axios.get('http://localhost:3002/api/niveis');
    const niveis = niveisResponse.data;

    const desenvolvedoresResponse = await axios.get('http://localhost:3002/api/desenvolvedores');
    const desenvolvedores = desenvolvedoresResponse.data;

    const niveisComQuantidade = niveis.map((nivel) => {
      const quantidade = desenvolvedores.filter((dev) => dev.nivel_id === nivel.id).length;
      return {
        ...nivel,
        quantidadeDesenvolvedores: quantidade,
      };
    });

    res.json(niveisComQuantidade);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
};
