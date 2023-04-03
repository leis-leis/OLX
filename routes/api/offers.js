const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
var multer = require("multer");
var crypto = require("crypto");
const path = require("path");

const Offer = require("../../models/Offer");
const User = require("../../models/User");
const Category = require("../../models/Category");

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

router.get(
  "/offeradd",
  async (req, res) => {
    const categories = await Category.find({
      Deleted: false
    })

    return res.json({
       categories: categories
    });
    
  }
)

router.post(
    "/offeradd",
    passport.authenticate("jwt", {
      session: false,
    }),
    uploads.any("Files"),
    async (req, res) => {
        let photo = [];
        if (req.files[0]?.path == undefined) {
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
            Description: req.body.Description,
            Photos: photo,
            User: req.user._id,
            Category: req.body.Cat,
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
    //console.log(req.user)
  
    return res.json({
       offers: offers,
    });
    
  }
)

router.get(
  "/offer/:id",
  async (req, res) => {
    const offer = await Offer.findOne({
      _id: req.params.id
    })
    const categories = await Category.find({})
    const offerer = await User.findOne({
      _id: offer.User
    })

    return res.json({
       offer: offer,
       offerer: offerer,
       categories: categories
    });
    
  }
)

router.post(
  "/offeredit/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  uploads.none(),
  async (req, res) => {
    const filter = { _id: req.params.id };

    var update;
    if (req.files?.path == undefined) {
      update = {
        Name: req.body.Name,
        Price: req.body.Price,
        Description: req.body.Desc,
      };
    } else {
      let photo = [];
      req.files.forEach(element => {
        photo.push(element.filename)
      })
      const update = {
        Name: req.body.Name,
        Price: req.body.Price,
        Description: req.body.Desc,
        Photos: photo,
      };
    }
    uploads.any("Files")
    

    await Offer.findOneAndUpdate(filter, update, {});
    res.status(200).json({
      msg: "Dane zostały zaktualizowane",
    });
  }
);

router.delete(
  "/offerdelete/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    await Offer.findOneAndDelete({ _id: req.params.id})
    res.json({
      msg: "Oferta usunięta"
    })
  }
)

router.get(
  "/offers",
  async (req, res) => {
    const offers = await Offer.find({
      
    }).sort({Date: 'desc'})//.skip(0).limit(5)  //wyswietlanie x ogloszen, zeby nie wyswietlac miliona na raz tylko po kilka do implementacji

    return res.json({
       offers: offers,
    });
  }
)

module.exports = router;