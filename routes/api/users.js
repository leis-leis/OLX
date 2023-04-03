const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys").secret;
const User = require("../../models/User");
var multer = require("multer");
var crypto = require("crypto");
const path = require("path");

router.post("/register", async (req, res) => {
  let { Login, Pass, PassConfirm, Name, Surname, Email, Phone } = req.body;

  if (Pass !== PassConfirm) {
    return res.status(400).json({
      msg: "Hasła nie są identyczne.",
    });
  }

  const userByName = await User.findOne({
    Login: Login,
  });

  if (userByName) {
    return res.status(400).json({
      msg: "Użytkownik o podanym loginie już istnieje",
    });
  }

  const userByEmail = await User.findOne({
    Email: Email,
  });

  if (userByEmail) {
    return res.status(400).json({
      msg: "Użytkownik o podanym Emailu już istnieje",
    });
  }

  const userByPhone = await User.findOne({
    Phone: Phone,
  });

  if (userByPhone) {
    return res.status(400).json({
      msg: "Użytkownik o numerze telefonu już istnieje",
    });
  }

  let newUser = new User({
    Login,
    Pass,
    Name,
    Surname,
    Email,
    Phone,
  });

  const hash = await bcrypt.hash(newUser.Pass, 10);
  newUser.Pass = hash;
  const saved = await newUser.save();

  return res.status(201).json({
    success: true,
    msg: "Rejestracja przebiegła pomyślnie.",
  });
});

router.post("/login", async (req, res) => {
  const found = await User.findOne({ Login: req.body.Login });
  if (!found) {
    return res.status(404).json({
      msg: "Użytkownik o podanym loginie nie istnieje.",
      success: false,
    });
  }

  const isMatch = await bcrypt.compare(req.body.Pass, found.Pass);
  if (!isMatch) {
    return res.status(401).json({
      msg: "Nieprawidłowe hasło.",
      success: false,
    });
  }

  const payload = {
    _id: found._id,
  };

  const token = await jwt.sign(payload, key, {
    expiresIn: 604800, //tydzień
  });

  res.status(200).json({
    success: true,
    token: `Bearer ${token}`,
    msg: "Jesteś teraz zalogowany/a",
  });
});

router.get(
  "/userpanel",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    return res.json({
      user: req.user,
    });
  }
);

router.get(
  "/usermodify",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    //console.log(req.user);
    return res.json({
      user: {
        Name: req.user.Name,
        Surname: req.user.Surname,
      },
    });
  }
);

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

const upload = multer({ storage: storage });

router.post(
  "/usermodify",
  passport.authenticate("jwt", {
    session: false,
  }),
  upload.single("File"),
  async (req, res) => {
    const isMatch = await bcrypt.compare(req.body.Password, req.user.Pass);
    if (!isMatch) {
      return res.status(401).json({
        msg: "Nieprawidłowe hasło.",
        success: false,
      });
    }
    const hash = await bcrypt.hash(req.body.Password, 10);
    const filter = { _id: req.user._id };
    
    var update
    if (req.file?.path == undefined) {
      update = {
        Name: req.body.Name,
        Surname: req.body.Surname,
        Pass: hash,
      };
    } else {
      var photo = fileName;
      update = {
        Name: req.body.Name,
        Surname: req.body.Surname,
        Pass: hash,
        Avatar: photo,
      };
      
    }
    
    await User.findOneAndUpdate(filter, update, {});
    res.status(200).json({
      msg: "Dane zostały zaktualizowane",
    });
  }
);

module.exports = router;
