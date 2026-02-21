const Expert = require("../models/Expert");

// GET /experts
exports.getExperts = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, search = "", category = "" } = req.query;

    const query = {
      name: { $regex: search, $options: "i" }
    };

    if (category) {
      query.category = category;
    }

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Expert.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      experts
    });
  } catch (error) {
    next(error);
  }
};

// GET /experts/:id
exports.getExpertById = async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    res.json(expert);
  } catch (error) {
    next(error);
  }
};