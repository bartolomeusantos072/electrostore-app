'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Produto, { foreignKey: 'usuario_id', as: 'produtos' });
    }
  }
  // Dentro de models/usuario.js
Usuario.init({
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha_hash: { type: DataTypes.STRING, allowNull: false }, // Certifique-se de que está assim, e não 'senha'
  perfil: { type: DataTypes.ENUM('admin', 'lojista', 'usuario'), defaultValue: 'usuario', allowNull: false }
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'Usuarios'
});
  return Usuario;
};