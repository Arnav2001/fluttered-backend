const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const User = require('./models/users');
require("./db/conn");
app.use(express.json());

// Define a basic route
app.post('/user', async(req, res) => {
    try{
      console.log(req.body);
      const user = new User(req.body);
      const createUser = await user.save();
      res.status(200).send(createUser);
    }catch(error){
      res.status(400).send(error);
    }
  });

  app.get('/user/:id', async (req,res)=>{
    try{
      const _id = req.params.id;
      const userData = await User.findById(_id);
      res.status(200).send(userData);
    }catch(error){
      res.status(500).send(error);
    }
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });