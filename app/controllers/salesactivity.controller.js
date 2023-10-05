const db = require("../models");
const SalesActivity = db.SalesActivity;
const { getPagination, getPagingData, isValidDate } = require("../utils");

const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const filteredColumnsReq = req.body.filtered_columns;
  const excludedColumnsReq = req.body.excluded_columns;

  const conditions = filteredColumnsReq.map((item, index) => {
    const operator =
      index < filteredColumnsReq.length - 1
        ? item.operator === "OR"
          ? " OR "
          : " AND "
        : "";
    const openBracket = item.open_bracket === "(" ? " ( " : "";
    const closeBracket = item.close_bracket === ")" ? " ) " : "";
    const columnName = item.column_name;
    const itemName = Array.isArray(item.item_name)
      ? item.item_name
      : [item.item_name];

    const subConditions = [];

    if (isValidDate(itemName[0 | 1], "yyyy-MM-dd")) {
      // If it's a date, use BETWEEN
      const startDate = itemName[0] || "CURRENT_TIMESTAMP";
      const endDate = itemName[1] || "CURRENT_TIMESTAMP";
      subConditions.push(
        `"${columnName}" BETWEEN '${startDate}' AND '${endDate}'`
      );
    } else {
      // Otherwise, use "="
      subConditions.push(`"${columnName}" = '${itemName}'`);
    }

    return `${openBracket} ${subConditions} ${closeBracket} ${operator}`;
  });

  const whereCondition = `${conditions.join(" ")}`;

  // console.log(whereCondition);

  SalesActivity.findAll({
    attributes: { exclude: excludedColumnsReq },
    where: sequelize.literal(whereCondition),
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
      distinct columns.column_name
FROM 
    information_schema.columns
WHERE 
    columns.column_name in (
    'Kota',
'Kecamatan',
'Merk',
'Model Mobil',
'Tahun Rakit',
'Tahun Produksi',
'Umur Kendaraan',
'Tanggal DO',
'Nama Leasing',
'Tenor',
'Age Range',
'Gender',
'Sumber Info',
'Motif Beli Customer',
'Asal Data',
'Kelas',
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

  const filteredColumnsReq = req.body.filtered_columns;
  const excludedColumnsReq = req.body.excluded_columns;

  try {
    const conditions = filteredColumnsReq.map((item, index) => {
      const operator =
        index < filteredColumnsReq.length - 1
          ? item.operator === "OR"
            ? " OR "
            : " AND "
          : "";
      const openBracket = item.open_bracket === "(" ? " ( " : "";
      const closeBracket = item.close_bracket === ")" ? " ) " : "";
      const columnName = item.column_name;
      const itemName = Array.isArray(item.item_name)
        ? item.item_name
        : [item.item_name];

      const subConditions = [];

      if (isValidDate(itemName[0 | 1], "yyyy-MM-dd")) {
        // If it's a date, use BETWEEN
        const startDate = itemName[0] || "CURRENT_TIMESTAMP";
        const endDate = itemName[1] || "CURRENT_TIMESTAMP";
        subConditions.push(
          `"${columnName}" BETWEEN '${startDate}' AND '${endDate}'`
        );
      } else {
        // Otherwise, use "="
        subConditions.push(`"${columnName}" = '${itemName}'`);
      }

      return `${openBracket} ${subConditions} ${closeBracket} ${operator}`;
    });

    const whereCondition = `${conditions.join(" ")}`;

    // console.log(whereCondition);
    // Calculate the total count of matching rows
    const totalCount = await SalesActivity.count({
      attributes: { exclude: excludedColumnsReq },
      where: sequelize.literal(whereCondition),
    });
    const { limit, offset } = getPagination(page, perPage, totalCount);

    await SalesActivity.findAndCountAll({
      limit: limit,
      offset: offset,
      attributes: { exclude: excludedColumnsReq },
      where: sequelize.literal(whereCondition),
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
