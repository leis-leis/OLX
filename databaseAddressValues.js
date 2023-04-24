const csv = require('csv-parser')
const fs = require('fs')
const express = require("express");
const router = express.Router();
const path = require("path");

const VoivodeshipList = require("./models/VoivodeshipList")
const Address = require("./models/Address")

var mongoose = require("mongoose");
const e = require('express');

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

const results = []

fs.createReadStream('miejscowosci.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        // const voivodeships = await VoivodeshipList.find({}).sort({Name: 'asc'}).collation({ locale: "pl"})

        results.sort((a, b) => {
            const nameA = a.Województwo.toUpperCase(); // ignore upper and lowercase
            const nameB = b.Województwo.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
            return -1;
            }
            if (nameA > nameB) {
            return 1;
            }
            return 0;
        });

        
        results.forEach(async el => {
            //  var v = voivodeships.find(e => {
            //     if(e.Name == el.Województwo){
            //         el.Województwo = e._id
            //     }
            //  })
             if(el.NazwaMiejscowości != ""){
             //console.log(el.NazwaMiejscowości)
             //console.log(el.Województwo)
             const newAddress = new Address({
                City: el.NazwaMiejscowości,
                Voivodeship: el.Województwo,
                County: el.Powiat
             })
             const saved = await newAddress.save();
            }
        })

        console.log("finished")
    })