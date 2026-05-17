'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      // Associação: Uma categoria possui muitos produtos
      Categoria.hasMany(models.Produto, { foreignKey: 'categoria_id', as: 'produtos' });
    }
  }
  Categoria.init({
    nome: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'Categorias'
  });
  return Categoria;
};