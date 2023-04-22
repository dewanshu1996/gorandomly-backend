const express = require('express')
const {
    updateTaskById , 
    createTak,joinTaskByCode
    ,getTaskById,
    joinTaskByLink
} = require("../controller/task.controller")

const router = new express.Router();

router.post('/create' , createTak);
router.put('/update/:id' , updateTaskById);
router.get("/join/:id" , joinTaskByLink);
router.post("/join" , joinTaskByCode);
router.get("/:id" , getTaskById);

module.exports = router