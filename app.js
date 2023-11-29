const express = require("express");
const bodyParser = require("body-parser");
// we use this line to require the function defined in Datetime.js file to be used in our project.
const getDate = require(__dirname + "/DateTime.js");

const app = express();
app.set("view engine", "ejs");
const port = 3000;
var items = [];
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
// this line bellow will allow our server to serve also other static file inside the public dir we created
// mainly the css style we want to apply to our site. to use it create a folder called public and place all static file inside it.
app.use(express.static("public"));

app.get("/", (req, res) => {
  // The value day is now ready to use getDay() function which was defined inside the DateTime.js file.
  // And then used in res.render() method. we can either pass getDate() or getDay() as defined in the file
  // Syntax: Variable we used to require.function we want to use.

  let day = getDate.getDate();

  res.render("list", { kindOfDay: day, AnotherItem: items });
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.post("/", function (req, res) {
  var item = req.body.next;
  items.splice(0,0,item);
  res.redirect("/");
});

app.post("/removeItem", function (req, res) {
  const indexToRemove = req.body.index;

  // Assuming AnotherItem is the array containing items
  if (indexToRemove >= 0 && indexToRemove < items.length) {
      items.splice(indexToRemove, 1);
      res.json({ success: true, message: 'Item removed successfully'+ items.indexToRemove});
  } else {
      res.json({ success: false, message: 'Invalid index' });
  }
});

app.post("/updateCompletionStatus", function (req, res) {
  const indexToUpdate = req.body.index;
  const completedStatus = req.body.completed;

  // Assuming AnotherItem is the array containing items
  if (indexToUpdate >= 0 && indexToUpdate < items.length) {
      // Update the completion status in the array
      items[indexToUpdate].completed = completedStatus;
      res.json({ success: true, message: 'Completion status updated successfully' });
  } else {
      res.json({ success: false, message: 'Invalid index' });
  }
});


app.listen(port, () => {
  console.log("my server is running on port " + port);
});

// to see ejs documentation used ejs.co and look at using ejs with express by scrolling down and check github to follow the steps.
