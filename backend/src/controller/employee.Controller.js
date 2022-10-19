const Employee = require("../models/employee");
const Technology = require("../models/technology");

exports.addEmployee = async (req, res) => {
  try {
    const empExists = await Employee.findOne({ email: req.body.email });
    if (empExists)
      return res.status(400).json({
        message: "Employee Already Existed",
      });
    const employee =  Employee(req.body);
    employee.createdBy = req.user._id
    const empData = await employee.save()
    if (empData) {
      return res.status(201).json({
        message: "Employee Added",
        Employee: empData,
      });
    } else {
      return res.status(400).json({
        message: "Employee Not Added",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
// exports.getAllEmployee = async (req, res) => {
//   try {
//     const search = req.query.search ?
//     {
//         $or:[
//             {firstName : {$regex :req.query.search,$options :'i'}},
//             {lastName : {$regex :req.query.search,$options :'i'}},
//             {email : {$regex :req.query.search,$options :'i'}},
//             {designation : {$regex :req.query.search,$options :'i'}},
//             {gender : {$regex :req.query.search,$options :'i'}},
//         ]
//     }
//      :{}
    
//      const page = req.query.page || 1
//      const pagesize = req.query.pagesize || 5
//      const skip = (page - 1) * pagesize
//      const total = await Employee.countDocuments()
//      const pages = Math.ceil(total / pagesize)
//     const data = await Employee.find(search).populate('technology',{_id:1,title:1}).skip(skip).limit(pagesize)
//     if (!data)
//       return res.status(404).json({
//         message: "Data Not Available",
//       });
//     return res.status(200).json({
//         count : data.length,
//         pages,
//         total,
//         data
//     });

//   } catch (error) {
//     throw new Error(error);
//   }
// };
exports.getAllEmployee = async (req, res) => {
  try {
    const search = req.query.search ?
    {
        $or:[
            {firstName : {$regex :req.query.search,$options :'i'}},
            {lastName : {$regex :req.query.search,$options :'i'}},
            {email : {$regex :req.query.search,$options :'i'}},
            {designation : {$regex :req.query.search,$options :'i'}},
            {gender : {$regex :req.query.search,$options :'i'}},
            {'technology.title':{$in:[new RegExp(techTitle, 'i')]}}   
        ]
    }
     :{}
     const page = req.query.page || 1
     const pagesize = req.query.pagesize || 5
     const skip = (page - 1) * pagesize
     const total = await Employee.countDocuments()
     const pages = Math.ceil(total / pagesize)
     
  
    const s = req.query.search
    var techTitle = new RegExp(s, "i")
     const data = await Employee.aggregate([
      {
        $lookup:{
          from:"technologies",
          localField:"technology",
          foreignField:"_id",
          as:"technology"
        }
      },
      {
        $match:{ $or:[
          {firstName : {$regex :req.query.search,$options :'i'}},
          {lastName : {$regex :req.query.search,$options :'i'}},
          {email : {$regex :req.query.search,$options :'i'}},
          {designation : {$regex :req.query.search,$options :'i'}},
          {gender : {$regex :req.query.search,$options :'i'}},
          {'technology.title':{$in:[new RegExp(techTitle, 'i')]}}   
      ]}
      }
    ]).skip(skip).limit(pagesize)
    
    if (!data)
      return res.status(404).json({
        message: "Data Not Available",
      });
    return res.status(200).json({
        count : data.length,
        pages,
        total,
        data
    });

  } catch (error) {
    throw new Error(error);
  }
};
exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Employee.findById(id).populate('technology',{_id:1,title:1})
    if (!data)
      return res.status(404).json({
        message: "Data Not Available",
      });
    return res.status(200).json({
        data
    });

  } catch (error) {
    throw new Error(error);
  }
};
exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const delEmp = await Employee.findByIdAndDelete(id);
    if (delEmp) {
      return res.status(200).json({
        message: "Employee Deleted",
      });
    } else {
      return res.status(400).json({
        message: "Employee Not Deleted",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const empData = {
        firstName,lastName,email,contact,gender,designation,technology,updatedBy : req.user._id
    } = req.body
    
    const upEmp = await Employee.findByIdAndUpdate(id, empData, {
      new: true,
    });
    if (upEmp) {
      return res.status(200).json({
        message: "Employee Updated",
        Employee: upEmp,
      });
    } else {
      return res.status(400).json({
        message: "Employee Not Updated",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
