require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const UserModel = require('./models/User');



const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/laOlaUrbana`,
   { logging: false, native: false }
);

UserModel(sequelize);
FavoriteModel(sequelize);


const { User, Favorite } = sequelize.models;

User.belongsToMany(Favorite, { through: 'user_favorite' });
Favorite.belongsToMany(User, { through: 'user_favorite' });


module.exports = {
   User,
   Favorite,
   conn: sequelize,
};