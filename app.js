const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));



app.use(express.static("Public"));
// Function that listens to port 3000, once requested it performs an action.
app.listen(process.env.PORT|| port , function() {

  console.log("Server is running on port 3000");

})


app.get("/", (req, res) => {

  res.sendFile(__dirname + "/signup.html");

})

app.post("/", (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {

    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {

        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const options = {
    method: "POST",
    auth: "yousef1:7e727b25063ce6bc869c097587e92045-us7"
  }

  const url = "https://us7.api.mailchimp.com/3.0/lists/5aa4f70500"

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {

      res.sendFile(__dirname + "/success.html")

    } else {
      res.sendFile(__dirname + "/failure.html")
    }


    response.on("data", function(data) {
      console.log(JSON.parse(data));
      var result = JSON.parse(data);

      console.log(result.errors[1]);
    })

  })
  request.write(jsonData);
  request.end();

})

app.get("/failure" , function(req, res){

res.redirect("/");

})

app.get("/success" , function(req, res){

res.redirect("/");

})


//https://server.api.mailchimp.com/3.0/lists/5aa4f70500
//

//7e727b25063ce6bc869c097587e92045-us7
