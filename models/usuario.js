'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Associação: Um usuário pode cadastrar muitos produtos
      Usuario.hasMany(models.Produto, { foreignKey: 'usuario_id', as: 'produtos' });
    }
  }
  Usuario.init({
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha_hash: { type: DataTypes.STRING, allowNull: false },
    perfil: { type: DataTypes.ENUM('usuario', 'admin', 'lojista'), allowNull: false }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios'
  });
  return Usuario;
};