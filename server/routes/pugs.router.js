const router = require('express').Router();
const { Pug } = require('../models');

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router.get('/', async (req, res, next) => {
    try {
        const data = await Pug.findAll();
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/favoriteCoffee/:favoriteCoffeeName', async (req, res, next) => {
    try {
        const data = await Pug.findByCoffee(req.params.favoriteCoffeeName);
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:pugId', async (req, res, next) => {
    try {
        const data = await Pug.findByPk(req.params.pugId);
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
        const newPug = await Pug.create(data);
        res.status(201).send(newPug);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.put('/:pugId', async (req, res, next) => {
    try {
        const updatedPug = await Pug.update(req.body, {
            where: { id: req.params.pugId },
            returning: true,
        });
        if (!updatedPug[0]) res.sendStatus(404);
        else res.send(updatedPug[1][0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.delete('/:pugId', async (req, res, next) => {
    try {
        const deletedPug = await Pug.destroy({
            where: { id: req.params.pugId },
        });
        if (!deletedPug) res.sendStatus(404);
        else res.sendStatus(204);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
