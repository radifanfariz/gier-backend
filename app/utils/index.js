const { DateTime } = require("luxon");

exports.getPagination = (page = 0, size = 1, totalRecords = 0) => {
  const limit = size ? Math.max(+size, 1) : 1; // Ensure limit is at least 1
  const maxOffset = Math.max(totalRecords - 1, 0); // Ensure offset doesn't exceed total records
  const offset = page ? Math.min(page * limit, maxOffset) : 0;

  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rows } = data;
  const currentPage = page ? +page : 1;
  const totalPage = limit
    ? Math.ceil(totalItems / limit)
    : Math.ceil(totalItems / 10);

  return {
    totalItems: totalItems,
    totalItemsPerPage: rows.length,
    totalPage,
    currentPage,
    rows: rows,
  };
};

exports.upsert = function upsert(model, values, condition) {
  return model.findOne({ where: condition }).then(function (obj) {
    // update
    if (obj) return obj.update(values);
    // insert
    return model.create(values);
  });
};

exports.isContentTableExist = function isContentTableExist(model) {
  const count = model.count();
  console.log(count);
  return count === 0 ? false : true;
};

exports.isValidDate = function isValidDate(dateString, format) {
  try {
    const parsedDate = DateTime.fromFormat(dateString, format, { zone: 'utc' });
    return parsedDate.isValid;
  } catch (error) {
    return false;
  }
}
