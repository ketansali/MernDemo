const Technology = require("../models/technology");

exports.addTechnology = async (req, res) => {
  try {
    const techData = await Technology.create(req.body);
  
    if (techData) {
      return res.status(201).json({
        message: "Technology Added",
        technology: techData,
      });
    } else {
      return res.status(400).json({
        message: "Technology Not Added",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
exports.getAllTechnology = async (req, res) => {
  try {
    const search = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};
    const page = req.query.page || 1;
    const pageSize  = req.query.pageSize  || 5;
    const skip = (page - 1) * pageSize
    const total = await Technology.countDocuments()
    const pages = Math.ceil(total / pageSize)
    const data = await Technology.find(search).skip(skip).limit(pageSize)
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
exports.gettechnologyEmployeeWise = async (req, res) => {
  try {
    
    const data = await Technology.aggregate([
      {$lookup:{
        from :'employees',
        localField:'_id',
        foreignField:'technology',
        as:'technology'
      }},
      {
        $project :{
          'technology.email' :1
        }
      }
    ])
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
exports.getAllTechnology = async (req, res) => {
  try {
    const search = req.query.search
      ? { title: { $regex: req.query.search, $options: "i" } }
      : {};
    const page = req.query.page || 1;
    const pageSize  = req.query.pageSize  || 5;
    const skip = (page - 1) * pageSize
    const total = await Technology.countDocuments()
    const pages = Math.ceil(total / pageSize)
    const data = await Technology.find(search).skip(skip).limit(pageSize)
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
exports.deleteTechnology = async (req, res) => {
  try {
    const id = req.params.id;
    const deltech = await Technology.findByIdAndDelete(id);
    if (deltech) {
      return res.status(200).json({
        message: "Technology Deleted",
      });
    } else {
      return res.status(400).json({
        message: "Technology Not Deleted",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
exports.updateTechnology = async (req, res) => {
  try {
    const id = req.params.id;
    const uptech = await Technology.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
      },
      { new: true }
    );
    if (uptech) {
      return res.status(200).json({
        message: "Technology Updated",
        technology: uptech,
      });
    } else {
      return res.status(400).json({
        message: "Technology Not Updated",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
