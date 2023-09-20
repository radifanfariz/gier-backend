const router = require("express").Router();
const favoriteFilter = require("../controllers/favoritefilter.controller")

module.exports = (app) => {

    //find all favorite filter
    router.get("/",favoriteFilter.findAll)

    //upsert favorite filter
    router.post("/upsert",favoriteFilter.upsert)

    //delete favorite filter
    router.delete("/delete/:id",favoriteFilter.delete)

    app.use("/api/gier/sales-activity/filter",router)
}