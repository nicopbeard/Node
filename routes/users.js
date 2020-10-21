const express = require('express');
const router = express.Router();

const users = [];

router.get('/', function(req, res, next) {
  //if there's a search query, send the appropriate response
  if(req.query.search)
  {
    //variable to store results to send
    var retUsers = [];
    //counter to check if the specified query matches any info in the users array
    var counter = 0;
    for(var i = 0; i < users.length; i++)
    {
      if(users[i].Name.includes(req.query.search) || users[i].Bio.includes(req.query.search))
      {
        counter = 1;
        retUsers.push(users[i]);
      }
    }
    //if the specified query doesn't match any information within the users array, send a 404 response
    if(counter === 0)
      res.status(404).send();
    //otherwise, send retUsers with the corresponding user entries
    else
      res.send(retUsers);
  }
  //otherwise, return all users
  else
    res.send(users);
});

router.get('/:username', function(req, res, next) {
  //counter to indicate whether the search for the username was successful
  var counter = 0;
  //iterate through the users and check to see if the specified username matches any of the usernames in the users array
  for(var i = 0; i < users.length; i++)
  {
    if(users[i].Username === req.params.username)
    {
      res.send(users[i]);
      counter = 1;
    }
  }
  //send a 404 if the username doesn't exist in the users array
  if(counter === 0)
    res.status(404).send();
});

router.post('/', function(req, res, next) {
  //counter to check for errors
  var counter = 0;
  
  //validate schema
  if(!req.body.Username || !req.body.Bio || !req.body.Name || !req.body.Date)
  {
    counter = 1;
    res.status(404).send();
  }

  //iterate through the users and check to see if the specified username matches any of the usernames in the users array
  for(var i = 0; i < users.length; i++)
  {
    if(users[i].Username === req.body.Username)
    {
      counter = 1;
      res.status(404).send();
    }
  }

  //send the request body if no errors were encountered
  if(counter === 0)
  {
    users.push(req.body);
    res.status(201).send();
  }
});

router.put('/:username', function(req, res, next) {
  //counter and validSchema to ensure the request follows the correct schema and check if the user exists
  var counter = 0;
  var validSchema = 0;

  //validate schema except for the username since the username that will be used is indicated by the request parameter
  if(!req.body.Bio || !req.body.Name || !req.body.Date)
  {
    validSchema = 1;
    res.status(404).send();
  }

  //if the schema is valid, check the users array for the specified username
  if(validSchema === 0)
  {
    //iterate through the users and check to see if the specified username matches any of the usernames in the users array
    for(var i = 0; i < users.length; i++)
    {
      if(users[i].Username === req.params.username)
      {
        counter = 1;
        users[i].Name = req.body.Name;
        users[i].Bio = req.body.Bio;
        users[i].Date = req.body.Date;
        res.status(201).send();
      }
    }

    //if the user doesn't exist, create one
    if(counter === 0)
    {
      users.push({
        "Username" : req.params.username,
        "Name" : req.body.Name,
        "Bio" : req.body.Bio,
        "Date" : req.body.Date
      });
      res.status(201).send();
    }
  }
});

router.delete('/:username', function(req, res, next) {
  //get the index of the specified username
  const removeIndex = users.findIndex(function(item) {
    return item.Username === req.params.username;
  });
  //remove the element from the array only if the removeIndex is valid
  if(removeIndex !== -1)
  {
    users.splice(removeIndex, 1);
    res.status(201).send();
  }
  //otherwise send a 404 if the specified username doesn't exist
  else
    res.status(404).send();
});

module.exports = router;