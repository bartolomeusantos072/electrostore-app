'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', [{
      id: 1,
      nome: 'Lojista ElectroStore',
      email: 'lojista@electrostore.com',
      senha_hash: '123456',
      perfil: 'lojista',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Categorias', [
      { id: 1, nome: 'Informática', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nome: 'Eletrodomésticos', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nome: 'Smartphones', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Produtos', null, {});
    await queryInterface.bulkDelete('Categorias', null, {});
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};