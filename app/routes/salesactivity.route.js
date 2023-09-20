const router = require("express").Router();
const salesActivity = require("../controllers/salesactivity.controller")

module.exports = (app) => {

    //find sales-activity data
    router.post("/all",salesActivity.findAll)

    //find sales-activity data by paging
    router.post("/",salesActivity.findByPaging)

    //find sales-activity column
    router.get("/column",salesActivity.findAllColumn)

    //find sales-activity column items
    router.post("/column/items",salesActivity.findColumnItems)

    app.use("/api/gier/sales-activity",router)
}