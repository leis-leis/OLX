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
const VoivodeshipList = require("../../models/VoivodeshipList");
const Address = require("../../models/Address");

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
       categories: categories,
    });
    
  }
)

router.get(
  "/addresses/:search?",
  async (req, res) => {
    let regex

    if(req.params.search){
      let s = "^" + req.params.search
      regex = new RegExp(s, 'i') // "i" opcja na case insensitive
    }
    var address
    if(regex){
      address = await Address.find({
      "City" : { "$regex": regex }
    }) 
    }else{
      address = await Address.find({
    })
    }

    return res.json({
       addresses: address
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

        const address = await Address.findOne({City: req.body.City, County: req.body.County, Voivodeship: req.body.Voivodeship})
        //console.log(address)
        const newOffer = new Offer({
            Name: req.body.Name,
            Price: req.body.Price,
            Description: req.body.Description,
            Photos: photo,
            User: req.user._id,
            Category: req.body.Cat,
            Address: address._id
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
    const categories = await Category.find({
      Deleted: false
    })
    const offerer = await User.findOne({
      _id: offer.User
    })
    const address = await Address.findOne({
      _id: offer.Address
    })

    return res.json({
       offer: offer,
       offerer: offerer,
       categories: categories,
       address: address
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
    const address = await Address.findOne({
      City: req.body.City,
      County: req.body.County,
      Voivodeship: req.body.Voivodeship
    })

    var update;
    if (req.files?.path == undefined) {
      update = {
        Name: req.body.Name,
        Price: req.body.Price,
        Description: req.body.Desc,
        Category: req.body.Category,
        Address: address._id
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
        Category: req.body.Category,
        Photos: photo,
        Address: address._id
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

router.get(
  "/foundoffers/:searchParam?/:sortBy?/:order?",
  async (req, res) => {
    var offers
    let regex

    if(req.params.searchParam){
      let s = req.params.searchParam
      regex = new RegExp(s, 'i') // "i" opcja na case insensitive
    }
    
    let sortBy
    let order
    if(req.params.sortBy){
      sortBy = req.params.sortBy
      order = req.params.order
    }

    if(regex && sortBy){
      var sort = {};
      sort[sortBy] = order
      offers = await Offer.find({
        "Name" : { "$regex": regex } 
      }).sort(sort)
      console.log(regex + ", " + sortBy + ", " + order)
      console.log(offers)
    }else if(regex){
      offers = await Offer.find({
        "Name" : { "$regex": regex } 
      })
    }else if(sortBy){ // tu sie wywali bo cos mu nie pasuje gdy chcemy sortować bez parametru
      offers = await Offer.find({}).sort({sortBy: order})
    }else{
      offers = await Offer.find({})
    }
    return res.json({
       offers: offers,
    });
  }
)

module.exports = router;