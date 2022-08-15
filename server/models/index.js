const db = require('./database');
const Pug = require('./pug.model');
const Coffee = require('./coffee.model');

// VVV assign relations below VVV //
// Coffee.hasMany(Pug);
Pug.belongsTo(Coffee, { as: 'favoriteCoffee' });

Pug.belongsToMany(Pug, { through: 'FriendsList', as: 'Friends' });

// ^^^ assign relations above ^^^ //

module.exports = {
    db,
    Pug,
    Coffee,
};
