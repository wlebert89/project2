var db = require("../models");

module.exports = function (app) {
    // Get route for retrieving a single venue
    app.get("/api/venues/", function (req, res) {
        db.Venue.findOne({
            where: {
                UserId: req.user.id
            }
        }).then(function (dbVenue) {
            var hbObject = {
                venue: dbVenue
            }
            // console.log(dbVenue);
            res.render("index-venue", hbObject);
        });
    });
}