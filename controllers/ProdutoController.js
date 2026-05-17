const { Produto, Usuario } = require('../models');


exports.listar = async (req, res) => {
    try {
        let filtro = {};
        const { categoria } = req.query;

 
        if (categoria) {

            if (isNaN(parseInt(categoria)) || parseInt(categoria) <= 0) {
                return res.status(400).render('error', { 
                    message: 'ID de categoria inválido. Deve ser um número inteiro positivo.' 
                });
            }
     
            filtro.categoria_id = parseInt(categoria); 
        }

        const produtos = await Produto.findAll({
            where: filtro,
            include: { model: Usuario, as: 'usuario' }
        });

  
        res.status(200).render('produtos/index', { 
            produtos: produtos, 
            categoriaSelecionada: categoria 
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { 
            message: 'Erro interno ao buscar os produtos no banco de dados.' 
        });
    }
};


exports.exibirFormularioCadastro = (req, res) => {
    res.render('produtos/cadastro');
};


exports.cadastrar = async (req, res) => {
    try {
        const { nome, preco, descricao, imagem_url, estoque } = req.body;

    
        if (!nome || !preco || !estoque) {
            return res.status(400).render('error', { 
                message: 'Os campos Nome, Preço e Estoque são obrigatórios.' 
            });
        }

     
        const precoNumerico = parseFloat(preco);
        const estoqueNumerico = parseInt(estoque);

        if (isNaN(precoNumerico) || precoNumerico <= 0) {
            return res.status(400).render('error', { 
                message: 'O preço informado deve ser um número válido e maior que zero.' 
            });
        }

        if (isNaN(estoqueNumerico) || estoqueNumerico < 0) {
            return res.status(400).render('error', { 
                message: 'O estoque informado não pode ser um valor negativo.' 
            });
        }

       const usuario_id = req.user ? req.user.id : 1; 

        await Produto.create({
            nome: nome,
            preco: precoNumerico,
            descricao: descricao,
            imagem_url: imagem_url,
            estoque: estoqueNumerico,
            usuario_id: usuario_id
        });

       
        res.redirect('/produtos');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { 
            message: 'Erro interno do servidor ao tentar salvar o produto.' 
        });
    }
};