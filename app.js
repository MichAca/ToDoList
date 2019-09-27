//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// const items = [];
// const workItems = [];

app.set('view engine', 'ejs'); //should be below const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemsSchema = {
  name: String
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {


  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("successfully saved default items to DB!")
        }
      });
      res.redirect("/");

    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }

  });

  //const today = new Date();
  //const day = date.getDate();
  //  let today = new Date();
  //const currentDay = today.getDate();
  //  let day = "";

});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  item.save();

  res.redirect("/");
  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }

});

app.get("/work", function(req, res) {

  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});


app.listen(3000, function() {
  console.log("server running on port 3000");
});
