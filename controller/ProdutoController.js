const { Produto, Usuario } = require('../models');

// Lista todos os produtos (R do CRUD)
exports.listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: { model: Usuario, as: 'usuario' }
        });
        res.render('produtos/index', { produtos: produtos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar os produtos no banco de dados.');
    }
};

// Exibe a tela de cadastro (C do CRUD - GET)
exports.exibirFormularioCadastro = (req, res) => {
    res.render('produtos/cadastro');
};

// Salva o produto (C do CRUD - POST)
exports.cadastrar = async (req, res) => {
    try {
        const { nome, preco, descricao, imagem_url, estoque } = req.body;

        // ID provisório do administrador criado no Seeder (enquanto não chegamos na aula de Passport)
        const usuario_id = 1; 

        await Produto.create({
            nome: nome,
            preco: parseFloat(preco),
            descricao: descricao,
            imagem_url: imagem_url,
            estoque: parseInt(estoque),
            usuario_id: usuario_id
        });

        res.redirect('/produtos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao salvar o produto.');
    }
};