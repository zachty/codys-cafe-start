const Sequelize = require('sequelize');
const db = require('./database');

const Coffee = db.define(
    'coffee',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ingredients: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: ['love'],
        },
    },
    {
        hooks: {
            beforeSave: coffee => {
                if (!coffee.ingredients.includes('love'))
                    coffee.ingredients.push('love');
            },
        },
    }
);
//model methods
Coffee.findByIngredient = function (ingred) {
    return Coffee.findAll({
        where: {
            ingredients: {
                [Sequelize.Op.contains]: [ingred],
            },
        },
    });
};

//instance methods
Coffee.prototype.getIngredients = function () {
    return this.ingredients.join(', ');
};

module.exports = Coffee;
