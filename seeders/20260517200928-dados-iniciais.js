'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Insere o Usuário Lojista padrão do sistema
    await queryInterface.bulkInsert('Usuarios', [{
      id: 1,
      nome: 'Lojista ElectroStore',
      email: 'lojista@electrostore.com',
      senha_hash: '123456',
      perfil: 'lojista',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // 2. Insere as Categorias do escopo do projeto
    await queryInterface.bulkInsert('Categorias', [
      { id: 1, nome: 'Informática', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nome: 'Eletrodomésticos', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nome: 'Smartphones', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // 3. NOVO: Adiciona a semeadura de Produtos vinculando os IDs acima
    await queryInterface.bulkInsert('Produtos', [
      {
        id: 1,
        nome: 'Notebook Ultra 16GB',
        preco: 4200.00,
        descricao: 'Notebook corporativo de alta performance com armazenamento SSD rápido.',
        quantidade: 12,
        status: 'ativo',
        categoria_id: 1, // Vinculado a Informática
        usuario_id: 1,   // Vinculado ao Lojista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nome: 'Geladeira Duplex Frost Free',
        preco: 3100.50,
        descricao: 'Geladeira econômica, alta capacidade de congelamento e painel digital.',
        quantidade: 5,
        status: 'ativo',
        categoria_id: 2, // Vinculado a Eletrodomésticos
        usuario_id: 1,   // Vinculado ao Lojista
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nome: 'Smartphone Pro 5G',
        preco: 2499.90,
        descricao: 'Tela de 120Hz, processador de última geração e câmera tripla de 48MP.',
        quantidade: 20,
        status: 'ativo',
        categoria_id: 3, // Vinculado a Smartphones
        usuario_id: 1,   // Vinculado ao Lojista
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Produtos', null, {});
    await queryInterface.bulkDelete('Categorias', null, {});
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};