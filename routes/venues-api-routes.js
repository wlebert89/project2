/* eslint-disable no-console */
var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
    // Get route for retrieving a single venue
    app.get("/api/venues/", isAuthenticated, function (req, res) {
        db.Venue.findOne({
            where: {
                UserId: req.user.id
            }
        }).then(function (dbVenue) {
            db.Gig.findAll({
                where:{
                    VenueId: dbVenue.id
                }
            }).then(function(dbGig) {
                var hbObject = {
                    venue: dbVenue,
                    gigs: dbGig
                }
                // console.log(dbVenue);
                res.render("index-venue", hbObject);
            })
        });
    });

    app.delete("/api/gigs/:id", function(req, res) {
        console.log(req.params.id);
        var id = req.params.id;
        db.Gig.destroy({
            where: {
                id: id
            }
        }).then(function() {
            res.send(200);
        });
    });
}