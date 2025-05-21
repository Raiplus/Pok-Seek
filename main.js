import express from 'express';
import mongoose from 'mongoose';
import { Users } from './models/users.js';  

const app = express();
const port = 3000;

// Connect to MongoDB
await mongoose.connect('mongodb://localhost:27017/'); 

app.use(express.json());
app.use(express.static('views'));

app.use(cookieParser()); 
let idNo=1

app.post('/userscores', async (req, res) => {
  console.log("Body:", req.body);

  const { userName, score } = req.body;
  req.cookie

  try {
    
    const user = new Users({ name: userName, score: score,id:idNo});
    res.cookie(id,idNo)
    await user.save();
    console.log("user added")
    idNo=idNo+1
    res.json({ message: "User saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving user" });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
