'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Insere um usuário inicial (Lojista) para associar aos produtos
    await queryInterface.bulkInsert('Usuarios', [{
      id: 1,
      nome: 'Lojista ElectroStore',
      email: 'lojista@electrostore.com',
      senha_hash: 'senha_criptografada_aqui', // Em produção seria um hash bcrypt
      perfil: 'lojista',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    // 2. Insere categorias iniciais exigidas pelo escopo de produtos
    await queryInterface.bulkInsert('Categorias', [
      { id: 1, nome: 'Informática', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nome: 'Eletrodomésticos', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nome: 'Smartphones', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categorias', null, {});
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};