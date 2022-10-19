const { addTechnology,getAllTechnology,updateTechnology,deleteTechnology, gettechnologyEmployeeWise } = require('../controller/technology.Controller')
const { authetication } = require('../middleware/authMiddleware')
const { techValidation } = require('../validation/technology.validation')

const router = require('express').Router()


router.post('/technology/addTechnology',authetication,techValidation,addTechnology)
router.get('/technology/getAllTechnology',authetication,getAllTechnology)
router.post('/technology/updateTechnology/:id',authetication,updateTechnology)
router.post('/technology/deleteTechnology/:id',authetication,deleteTechnology)
router.get('/technology/gettechnologyEmployeeWise',gettechnologyEmployeeWise)



module.exports = router