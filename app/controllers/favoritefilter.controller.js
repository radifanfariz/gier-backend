const db = require("../models");
const FavoriteFilter = db.FavoriteFilter;
const {
  getPagination,
  getPagingData,
  isValidDate,
  upsert,
} = require("../utils");

const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;

exports.upsert = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Param can not be empty!",
    });
    return;
  }
  const FavoriteFilterReq = {
    c_module_name: req.body.c_module_name,
    c_filter_name: req.body.c_filter_name,
    j_filter_scheme: req.body.j_filter_scheme,
    d_created_at: req.body.d_created_at,
    d_updated_at: req.body.d_updated_at,
    n_created_by: req.body.n_created_by,
    n_updated_by: req.body.n_updated_by,
  };
  const upsertObj = upsert(FavoriteFilter, FavoriteFilterReq, {
    [Op.and]: [
      FavoriteFilterReq.c_filter_name
        ? {
            c_filter_name: {
              [Op.iLike]: `%${FavoriteFilterReq.c_filter_name}%`,
            },
          }
        : null,
      FavoriteFilterReq.c_module_name
        ? {
            c_module_name: {
              [Op.iLike]: `%${FavoriteFilterReq.c_module_name}%`,
            },
          }
        : null,
    ],
  });
  upsertObj
    .then((data) => {
      const successResponse = {
        status: true,
        message: "Ok",
        totalItems: data.length,
        data: data,
      };
      res.send(successResponse);
    })
    .catch((err) => {
      const errorResponse = {
        status: false,
        message:
          err.message ||
          "Some error occurred while creating the PM-Otomotif Weekly data.",
      };
      console.log(err.errors);
      res.status(500).send(errorResponse);
    });
};

exports.delete = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Param can not be empty!",
    });
    return;
  }
  const id = req.params.id;
  console.log(id)
  try {
    const deletedUser = FavoriteFilter.destroy({
      where: {
        n_id: id,
      },
    });

    if (deletedUser === 0) {
      return res
        .status(404)
        .json({ message: "No favorite filter found with that ID." });
    }

    return res
      .status(200)
      .json({
        message: `Favorite filter with ID ${id} deleted successfully.`,
      });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.findAll = (req, res) => {
  const arrayReq = req.body;

  FavoriteFilter.findAll()
    .then((data) => {
      const successResponse = {
        meta: {
          code: 200,
          status: "success",
          message: "Success",
        },
        totalItems: data.length,
        data: data,
      };
      res.send(successResponse);
    })
    .catch((error) => {
      const errorResponse = {
        status: false,
        message:
          error.message || "Some error occurred while retrieving SPD data.",
      };
      res.status(500).send(errorResponse);
    });
};
