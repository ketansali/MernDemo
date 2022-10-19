const { addEmployee,getAllEmployee,updateEmployee,deleteEmployee, getEmployeeById } = require('../controller/employee.Controller')
const { authetication } = require('../middleware/authMiddleware')
const { employeeValidation } = require('../validation/employee.validation')

const router = require('express').Router()


router.post('/employee/addEmployee',authetication,employeeValidation,addEmployee)
router.get('/employee/getAllEmployee',authetication,getAllEmployee)
router.post('/employee/updateEmployee/:id',authetication,updateEmployee)
router.post('/employee/deleteEmployee/:id',authetication,deleteEmployee)
router.get('/employee/getEmployeeById/:id',authetication,getEmployeeById)



module.exports = router