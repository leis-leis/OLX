const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
var multer = require("multer");
var crypto = require("crypto");
const path = require("path");
const {parse, stringify} = require('flatted');

const Offer = require("../../models/Offer");

var fileName;
const storage = multer.diskStorage({
  destination: "./client/src/assets/uploads",
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(
        null,
        fileName = raw.toString("hex") + Date.now() + path.extname(file.originalname)
      );
    });
  },
});

const uploads = multer({ storage: storage });

router.post(
    "/offeradd",
    passport.authenticate("jwt", {
      session: false,
    }),
    uploads.any("Files"),
    async (req, res) => {
        let photo = [];
        if (req.files[0].path == undefined) {
            photo[0] = "default.png";
        } else {
            //console.log(req.files)
            req.files.forEach(element => {
                photo.push(element.filename)
            })
        }
        
        const newOffer = new Offer({
            Name: req.body.Name,
            Price: req.body.Price,
            Description: req.body.Desc,
            Photos: photo,
            User: req.user._id,
        })

        const saved = await newOffer.save();
        
        return res.json({
          msg:"Oferta dodana"
        })
    }
    
);

router.get(
  "/myoffers",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const offers = await Offer.find({
      User: req.user._id
    })
  
    return res.json({
       offers: offers,
    });
    
  }
)

router.get(
  "/offer",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const offer = await Offer.findOne({
      _id: req.body.OfferId
    })

    return res.json({
       offer: offer,
    });
    
  }
)

router.post(
  "/offeredit",
  passport.authenticate("jwt", {
    session: false,
  }),
  uploads.none(),
  async (req, res) => {
    const filter = { _id: req.body.OfferId };

    let photo = [];
    if (req.files[0].path == undefined) {
      photo[0] = "default.png";
    } else {
      //console.log(req.files)
      req.files.forEach(element => {
        photo.push(element.filename)
      })
    }
    uploads.any("Files")
    const update = {
      Name: req.body.Name,
      Price: req.body.Price,
      Description: req.body.Desc,
      Photos: photo,
    };

    await Offer.findOneAndUpdate(filter, update, {});
    res.status(200).json({
      msg: "Dane zostały zaktualizowane",
    });
  }
);

router.post(
  "/offerdelete",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    const deleteOffer = await Offer.deleteOne({ _id: req.body.Id})

    res.json({
      msg: "Oferta usunięta"
    })
  }
)

module.exports = router;