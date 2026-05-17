'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      // Amarração das Chaves Estrangeiras (FK) para os relacionamentos
      Produto.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
      Produto.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
    }
  }

  Produto.init({
    nome: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    preco: { 
      type: DataTypes.FLOAT, 
      allowNull: false 
    },
    descricao: { 
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    quantidade: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    status: { 
      type: DataTypes.ENUM('ativo', 'inativo'), // Valores predefinidos idênticos ao enunciado
      allowNull: false 
    },
    categoria_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    usuario_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Produto',
    tableName: 'Produtos'
  });

  return Produto;
};