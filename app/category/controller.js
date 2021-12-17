const Category = require("./model");

module.exports = {
  async index(req, res, next) {
    try {
      const data = await Category.find().sort({ createdAt: -1 });

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  },
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category({ name });

      const data = await category.save();

      return res.status(201).json({ message: "success", data });
    } catch (error) {
      console.log(error);
    }
  },
};
