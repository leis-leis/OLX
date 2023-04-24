var mongoose = require("mongoose");

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(`COULDN'T CONNECT TO DATABASE ${err}`);
  });

var Voivodeship = require("./models/VoivodeshipList");
var UserType = require("./models/UserType");
var Status = require("./models/Status");
var Category = require("./models/Category");

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

const Categories = [
  {
    Name: "Motoryzacja",
    Deleted: false,
    MainCategory: null,
    Icon: "fa-car"
  },
  {
    Name: "Nieruchomości",
    Deleted: false,
    MainCategory: null,
    Icon: "fa-key"
  },
  {
    Name: "Antyki",
    Deleted: false,
    MainCategory: null,
    Icon: "fa-briefcase"
  },
  {
    Name: "Dom i Ogród",
    Deleted: false,
    MainCategory: null,
    Icon: "fa-home"
  },
  {
    Name: "Elektronika",
    Deleted: false,
    MainCategory: null,
    Icon: "fa-mobile"
  },
  {
    Name: "Zwierzeta",
    Deleted: false,
    MainCategory: null,
    Icon: "fa-dog"
  },
  {
    Name: "Sport i Hobby",
    Deleted: false,
    MainCategory: null,
    Icon: "fa-futbol"
  },
  {
    Name: "Dla dzieci",
    Deleted: false,
    MainCategory: null,
    Icon: "fa-child"
  },
  {
    Name: "Muzyka",
    Deleted: false,
    MainCategory: null,
    Icon: "fa-music"
  },
];

async function main()
{
  try {
    const db = mongoose.connection.client.db("OLX"); //nazwa bazy jak macie inną

    //   Get all collections
    //const collections = await db.listCollections().toArray();
    //console.log(collections)

    //   Create an array of collection names and drop each collection
    //collections
    //  .map((collection) => collection.name)
    //  .forEach(async (collectionName) => {
    //    db.dropCollection(collectionName);
    //  });

  /* insert data */
  Voivodeship.create(Voivodeships)
    .then(function () {
      console.log("Successfully saved voivodeships to DB");
    })
    .catch(function (err) {
      console.log(err);
    });

    Category.create(Categories)
    .then(function () {
      console.log("Successfully saved categroies to DB");
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
}


main()