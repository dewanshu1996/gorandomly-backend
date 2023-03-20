const express = require('express')
const Randomly = require("../model/randomly.model")
const router = new express.Router()

router.post('/randomly/create', async (req, res) => {
    const randomly = new Randomly(res.body);
    try {
        await randomly.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/randomly/join/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const randomly = await Randomly.findById(_id);
        randomly.options.push(res.body);
        randomly.save();
        return res.status(200).send()        
    } catch (e) {
        return res.status(404).send()
    }
})

router.post('/randomly/initiate/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const randomly = await Randomly.findById(_id);
        res.send(randomly)
    } catch (e) {
        return res.status(404).send()
    }
})


module.exports = router