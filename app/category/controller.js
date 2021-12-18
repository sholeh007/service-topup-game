const Category = require("./model");

module.exports = {
  async index(req, res, next) {
    try {
      const { id } = req.query;
      if (id) {
        const category = await Category.findById({ _id: id });
        if (!category)
          return res.status(406).json({ message: "category not found" });
        return res.status(200).json({ data: category });
      }
      const data = await Category.find().sort({ createdAt: -1 });

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const exist = await Category.findOne({ name });

      if (exist)
        return res
          .status(406)
          .json({ error: 1, message: "category already exist" });
      const category = await Category({ name });

      const data = await category.save();

      return res.status(201).json({ message: "success", data });
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      console.log(name);
      const category = await Category.findById({ _id: id });

      if (!category)
        return res
          .status(404)
          .json({ error: 1, message: "category not found" });

      if (category.name === name)
        return res
          .status(406)
          .json({ error: 1, message: "category already exist" });

      const data = await Category.findByIdAndUpdate({ _id: id }, { name });

      return res.status(200).json({ message: "success", data });
    } catch (error) {
      next(error);
    }
  },
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete({ _id: id });
      return res.status(200).json({ message: "success" });
    } catch (error) {
      next(error);
    }
  },
};
