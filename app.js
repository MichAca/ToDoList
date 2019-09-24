//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.set('view engine', 'ejs'); //should be below const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {

  const today = new Date();
  const day = date.getDate();
  //  let today = new Date();
  const currentDay = today.getDate();
  //  let day = "";

  // if (currentDate === 6 || currentDate === 0){
  //   day = "weekend";
  //   //res.sendFile(__dirname + "/weekend.html");
  //   //res.render("list", {kindOfDay: day});
  // } else {
  //   day = "weekday";
  //   //res.sendFile(__dirname + "/weekday.html");
  // }
  // switch (currentDay) {

  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //
  //   default:
  //     console.log("Error: Current day is equal to: " + currentDay);
  // }
  // let options = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric"
  // };
  //
  // day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

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

// app.post("/work", function(req,res){
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
//
// });

app.listen(3000, function() {
  console.log("server running on port 3000");
});
