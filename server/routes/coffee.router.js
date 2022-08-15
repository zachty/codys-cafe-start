const router = require('express').Router();
const { Coffee } = require('../models');

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

router.get('/', async (req, res, next) => {
    try {
        const data = await Coffee.findAll();
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/ingredients/:ingredientName', async (req, res, next) => {
    try {
        const data = await Coffee.findByIngredient(req.params.ingredientName);
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:coffeeId', async (req, res, next) => {
    try {
        const data = await Coffee.findByPk(req.params.coffeeId);
        if (!data) res.sendStatus(404);
        else res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const newCoffee = await Coffee.create(data);
        res.status(201).send(newCoffee);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
