const db = require("../models");
const SalesActivity = db.SalesActivity;
const { getPagination, getPagingData, isValidDate } = require("../utils");

const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const arrayReq = req.body;

  const whereCondition = arrayReq.reduce((result, item) => {
    const operatorKey = (() => {
      switch (item.operator) {
        case "OR":
          return Op.or;
        case "AND":
          return Op.and;
        default:
          return Op.and;
      }
    })();

    return {
      ...result,
      [operatorKey]: {
        ...(result[operatorKey] || {}),
        [item.column_name]: isValidDate(item.item_name[0],"yyyy-MM-dd")
          ? {
              [Op.between]: Array.isArray(item.item_name)
                ? item.item_name
                : [item.item_name, new Date()],
            }
          : {
              [Op.in]: Array.isArray(item.item_name)
                ? item.item_name
                : [item.item_name],
            },
      },
    };
  }, {});

  SalesActivity.findAll({
    where: whereCondition,
  })
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
exports.findAllColumn = (req, res) => {
  sequelize
    .query(
      `SELECT 
    columns.column_name
FROM 
    information_schema.columns
WHERE 
    columns.column_name in (
    'Kota',
'Kecamatan',
'Model Mobil',
'Tahun Rakit',
'Tanggal DO',
'Nama Leasing',
'Tenor',
'Age Range',
'Gender',
'Sumber Info',
'Motif Beli Customer',
'Asal Data',
'Transmisi',
'Segmentasi',
'Sumber Info',
'Status Kredit',
'Jenis Mobil',
'Jenis Pembayaran'
) order by  columns.column_name asc`
    )
    .then((data) => {
      const successResponse = {
        meta: {
          code: 200,
          status: "success",
          message: "Success",
        },
        totalItems: data[0].length,
        data: data[0].map((item) => {
          return {
            id: item.column_name,
            name: item.column_name,
          };
        }),
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
exports.findColumnItems = (req, res) => {
  const { column_name } = req.body;
  sequelize
    .query(
      `SELECT DISTINCT "${column_name}" FROM sales_activity WHERE "${column_name}" IS NOT NULL ORDER BY "${column_name}" ASC`
    )
    .then((data) => {
      const successResponse = {
        meta: {
          code: 200,
          status: "success",
          message: "Success",
        },
        totalItems: data[0].length,
        data: data[0].map((item) => {
          return {
            id: item[column_name],
            name: item[column_name],
          };
        }),
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

exports.findByPaging = async (req, res) => {
  const { page, perPage } = req.query;

  const arrayReq = req.body;

  try {
    const whereCondition = arrayReq.reduce((result, item) => {
      const operatorKey = (() => {
        switch (item.operator) {
          case "OR":
            return Op.or;
          case "AND":
            return Op.and;
          default:
            return Op.and;
        }
      })();
  
      // console.log("Test: "+isValidDate(item.item_name[0],""yyyy-MM-dd""))
  
      return {
        ...result,
        [operatorKey]: {
          ...(result[operatorKey] || {}),
          [item.column_name]: isValidDate(Array.isArray(item.item_name) ? item.item_name[0] : item.item_name,"yyyy-MM-dd")
            ? {
                [Op.between]: Array.isArray(item.item_name)
                  ? item.item_name
                  : [item.item_name, new Date()],
              }
            : {
                [Op.in]: Array.isArray(item.item_name)
                  ? item.item_name
                  : [item.item_name],
              },
        },
      };
    }, {});
  
    // Calculate the total count of matching rows
    const totalCount = await SalesActivity.count({ where: whereCondition });
    const { limit, offset } = getPagination(page, perPage, totalCount);
  
    // console.log(whereCondition);
  
    await SalesActivity.findAndCountAll({
      limit: limit,
      offset: offset,
      where: whereCondition,
    })
      .then((data) => {
        console.log(data);
        const { totalItems, totalPage, totalItemsPerPage, currentPage, rows } =
          getPagingData(data, page, limit);
        const successResponse = {
          meta: {
            code: 200,
            status: "success",
            message: "Success",
          },
          totalItems: totalItems,
          totalItemPerPage: totalItemsPerPage,
          totalPage: totalPage,
          currentPage: currentPage,
          header: Object.keys(rows[0].dataValues).map((item) => {
            return {
              id: item,
              name: item,
            };
          }),
          data: rows,
        };
        res.send(successResponse);
      })
      .catch((error) => {
        const errorResponse = {
          meta: {
            code: 500,
            status: "failed",
            message:
              error.message ||
              "Some error occurred while retrieving Sales Activity data.",
          },
        };
        res.status(500).send(errorResponse);
      });
    
  } catch (error) {
    res.status(500).send("Something went wrong !");
  }

};
