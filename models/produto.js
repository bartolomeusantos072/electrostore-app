'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      Produto.belongsTo(models.Categoria, { foreignKey: 'categoria_id' });
      Produto.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    }
  }
Produto.init({
    nome: { type: DataTypes.STRING, allowNull: false },
    preco: { type: DataTypes.FLOAT, allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('ativo', 'inativo'), defaultValue: 'ativo', allowNull: false },
    categoria_id: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'Produtos'
  });
  return Produto;
};