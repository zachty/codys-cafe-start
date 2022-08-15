const Sequelize = require('sequelize');
const db = require('./database');
const Coffee = require('./coffee.model');

const Pug = db.define(
    'pugs',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        age: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        biography: {
            type: Sequelize.TEXT,
        },
    },
    {
        hooks: {
            beforeSave: pug =>
                (pug.name = `${pug.name[0]}`.toUpperCase() + pug.name.slice(1)),
        },
    }
);

//model methods
//TODO: find out why this is returning undefined
//default value in coffee array was undefined so the include in the hook was throwing an error
Pug.findByCoffee = function (coffee) {
    return Pug.findAll({
        include: {
            model: Coffee,
            as: 'favoriteCoffee',
            where: {
                name: coffee,
            },
        },
    });
};

//instance methods
Pug.prototype.isPuppy = function () {
    return this.age < 1;
};

Pug.prototype.shortBio = function () {
    //match all alphanumeric letters and spaces from beginning of input until first non-alphanumeric character
    return this.biography.match(/^[\w\s]+(?=\W)/)[0];
    //return this.biography.slice(0, this.biography.search(/[^\w\s]/));
};

module.exports = Pug;
