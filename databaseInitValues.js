var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://0.0.0.0:27017/OLX",

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var Voivodeship = require("./models/VoivodeshipList");
var UserType = require("./models/UserType");
var Status = require("./models/Status");

const Voivodeships = [
  {
    Name: "dolnośląskie",
  },
  {
    Name: "kujawsko-pomorskie",
  },
  {
    Name: "lubelskie",
  },
  {
    Name: "lubuskie",
  },
  {
    Name: "łódzkie",
  },
  {
    Name: "małopolskie",
  },
  {
    Name: "mazowieckie",
  },
  {
    Name: "opolskie",
  },
  {
    Name: "podkarpackie",
  },
  {
    Name: "podlaskie",
  },
  {
    Name: "pomorskie",
  },
  {
    Name: "śląskie",
  },
  {
    Name: "świętokrzyskie",
  },
  {
    Name: "warmińsko-mazurskie",
  },
  {
    Name: "wielkopolskie",
  },
  {
    Name: "zachodniopomorskie",
  },
];

const Statuses = [
  {
    Status: "Wystawiony",
  },
  {
    Status: "Zakończony",
  },
  {
    Status: "Usunięty",
  },
];

try {
  console.log("rzecz");
  const db = mongoose.connection.db;

  //   Get all collections
  const collections = await db.listCollections().toArray();

  //   Create an array of collection names and drop each collection
  collections
    .map((collection) => collection.name)
    .forEach(async (collectionName) => {
      db.dropCollection(collectionName);
    });

  /* insert data */
  Voivodeship.create(Voivodeships)
    .then(function () {
      console.log("Successfully saved voivodeships to DB");
    })
    .catch(function (err) {
      console.log(err);
    });

  Status.create(Statuses)
    .then(function () {
      console.log("Successfully saved Status' to DB");
    })
    .catch(function (err) {
      console.log(err);
    });

} catch (e) {
  console.log(e);
}
