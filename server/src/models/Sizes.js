const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "Size",
        {
            idSize: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            nameSize: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            }
        }, 
        {
            timestamps: false,
        }
    );
};