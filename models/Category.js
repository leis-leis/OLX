var mongoose = require("mongoose");

var CategorySchema = mongoose.Schema({
    Name:{type:String, required:true}
});

//ewentualna rozbudowa o subkategorie
//rekursywna zależność kategorii
//kategoria główna daje null, subkategorie odwołują się do kategorii głównej

var Category = mongoose.model("Category", CategorySchema);

module.exports = Category;