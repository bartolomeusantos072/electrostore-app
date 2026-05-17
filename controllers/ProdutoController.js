const { Produto, Categoria } = require('../models');

module.exports = {
  exibirFormularioCadastro: async (req, res) => {
    try {
      const Blacklist = await Categoria.findAll();
      res.status(200).render('produtos/cadastro', { categorias: Blacklist });
    } catch (error) {
      res.status(500).render('error', { message: 'Erro ao carregar o formulário.' });
    }
  },

  cadastrar: async (req, res) => {
    try {
      const { nome, preco, quantidade, descricao, status, categoria_id } = req.body;
      const usuario_id = req.user.id;

      if (!nome || !preco || !quantidade || !descricao || !status || !categoria_id) {
        const Blacklist = await Categoria.findAll();
        return res.status(400).render('produtos/cadastro', { 
          categorias: Blacklist, 
          error_message: 'Todos os campos são obrigatórios!' 
        });
      }

      await Produto.create({ nome, preco, quantidade, descricao, status, categoria_id, usuario_id });
      res.redirect('/');
    } catch (error) {
      const Blacklist = await Categoria.findAll();
      res.status(500).render('produtos/cadastro', { 
        categorias: Blacklist, 
        error_message: 'Erro interno ao salvar o produto.' 
      });
    }
  },

  consultar: async (req, res) => {
    try {
      const { id } = req.params;
      if (isNaN(id)) return res.status(400).render('error', { message: 'ID inválido.' });

      const produto = await Produto.findByPk(id, { include: [Categoria] });
      if (!produto) return res.status(404).render('error', { message: 'Produto não encontrado.' });

      res.status(200).render('produtos/consulta', { produto });
    } catch (error) {
      res.status(500).render('error', { message: 'Erro ao consultar o produto.' });
    }
  }
};