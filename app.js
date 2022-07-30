const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const client = require("mailchimp-marketing");


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

  var lastName = req.body.lName;
  var firstName = req.body.fName;
  var email = req.body.email;

  console.log(firstName + " " + lastName + " " + email);

  const data= {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

  const string_members = JSON.stringify(data);


  const options = {
    
  }

  const request = https.request(url,options, function(response) {

    if(response.statusCode === 200)
    res.sendFile(__dirname + "/success.html");
    else
    res.sendFile(__dirname + "/failure.html");

  response.on('data', function(data) {
    console.log(JSON.parse(data));
  });
});

request.write(string_members);
request.end();

})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server stared at port 3000");
})


//  API KRY
 // 4dfdf51f151fd441201a4e62b5bebafa-us13
