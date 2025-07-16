module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
    });


  
    return Category;
  };

  
