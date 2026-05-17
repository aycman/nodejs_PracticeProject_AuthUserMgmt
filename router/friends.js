const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  //get all the user information using JSON string
  res.send(JSON.stringify(friends,null,4));
  // const allUsers = JSON.stringify(friends);
  // res.send(allUsers);
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  //retrieve the email params from the request URL and send the corrisponding friend's details
  const email = req.params.email;
  res.send(friends[email]);
});


// POST request: Add a new friend
router.post("/",function(req,res) {
  //check if email is provided in the request body
  if (req.body.email) {
    //create or update friend's details based on provided email
    friends[req.body.email] = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "DOB": req.body.DOB
    }
  }
  //send response indicating user addition
  res.send("The user " + (' ') + (req.body.firstName) + " has been added")
});


// PUT request: Update the details of a friend with email id
router.put("/:email", function (req, res) {
  //extract email parameter from request URL
  const email = req.params.email;
  //retrieve friend objetc associated with email
  let friend = friends[email];

  //check if friend exists
  if(friend) {
    let DOB = req.body.DOB;
    let firstName = req.body.firtsName;
    let lastName = req.body.lastName;

    //update friend variable with new details if provided in request body
    if (DOB) {
      friend["DOB"] = DOB;
    }
    if (firstName) {
      friend["firstName"] = firstName;
    }
    if (lastName) {
      friend["lastName"] = lastName;
    }

    //update friend variable details in friends object
    friends[email] = friend;

    //send response indicating user update
    res.send(`Friend with the email ${email} updated`);
  } else {
    //response if friend with the specified email does not found
    res.send("Unable to find friend");
  }

});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  //extract email from request URL
  const email = req.params.email;
  
  if(email) {
    //delete friend from 'friends' object based on provided email
    delete friends[email];
  }
  //send response confirming deletion of friend
  res.send(`Friend with the email ${email} deleted`);
});

module.exports=router;
