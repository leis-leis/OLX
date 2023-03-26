const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const Category = require("../../models/Category");

router.get(
    "/adminpanel",
    passport.authenticate("jwt", {
      session: false,
    }),
    async (req, res) => {
        const categories = await Category.find({
            Deleted:false
        });
        //console.log(categories)
      return res.json({
        categories: categories,
      });
    }
);

router.post(
    "/categoryadd",
    passport.authenticate("jwt", {
      session: false,
    }),
    async (req, res) => {
        let Name = req.body.Name
        let MainCategory = req.body.MainCategory
        
        var newCategory

        if(MainCategory == '-1'){
            newCategory = new Category({
                Name
            })
        }else{
            newCategory = new Category({
                Name,
                MainCategory
            })
        }

        const saved = await newCategory.save();
     
    }
);


router.post(
    "/categorydel",
    passport.authenticate("jwt", {
        session: false,
    }),
    async (req, res) => {
        const categoryToDel = await Category.findOne({
            _id:req.body.Id
        })

        categoryToDel.Deleted = true

        const saved = await categoryToDel.save()
    }
)


module.exports = router;