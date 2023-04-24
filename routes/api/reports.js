const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const path = require("path");

const Offer = require("../../models/Offer");
const User = require("../../models/User");
const Report = require("../../models/Report");

router.post(
    "/report/:id",
    passport.authenticate("jwt", {
      session: false,
    }),
    async (req, res) => {
        //console.log(req.body)
        const newReport = new Report({
            Title: req.body.Title,
            Description: req.body.Desc,
            Offer: req.params.id,
            User: req.user._id,
        })
        console.log(newReport)
        const saved = await newReport.save();
        
        return res.json({
          msg:"Wysłano zgłoszenie"
        })
    }
    
);

module.exports = router