import express from 'express';
import mongoose from 'mongoose';
import { Users } from './models/users.js';
import cookieParser from 'cookie-parser';
import fs from 'fs'
import moment from 'moment';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());


app.use(cors());
const port = 3000;
app.use(express.static('views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});



app.use(cookieParser());
let last_Rank = 0

let idNo = parseInt(fs.readFileSync("UserId.txt", "utf-8"));
console.log("thsi is initaal", idNo)
score_last()
setInterval(() => {
  score_last()

}, 10000)
function score_last() {
  let arr = []
  let last_Rank_data = fs.readFileSync("Top10.txt", "utf-8")
  arr = JSON.parse(last_Rank_data)
  last_Rank = arr[9].score



}

console.log(idNo)
//updating leader board
app.get('/getdata', (req, res) => {
  let arr = []
  let Leaderboard_data = fs.readFileSync("Top10.txt", "utf-8")
  arr = JSON.parse(Leaderboard_data)
  for (let i = 0; i < 10; i++) {
    arr[i].rank = i + 1
  }
  res.json({ arr, message: "successfully" })


})
//

app.post('/', (req, res) => {

  res.json({ "last_Rank": last_Rank })

})
//
app.post('/AmION10', async (req, res) => {
  let data = req.body
 res.json({ message: "successfully" }); 
  top10(data)
  res.json({ "status": "ok" })

})

app.post('/userscores', async (req, res) => {

  if (req.cookies.user) {

    const { user, id, score } = req.cookies;


    const parsedId = parseInt(id)
    try {
      const userDoc = await Users.findOneAndUpdate(
        { id: parsedId }, { score: req.body.score });
        res.json({ message: "Score updated successfully" })


    } catch (err) {
      console.error("Error updating score:", err);
        res.status(500).json({ error: "Failed to update score" });
    }
  }

  else {
    const { userName, score } = req.body;
    try {
      console.log(idNo)
      const user = new Users({ name: userName, score: score, id: idNo });
      await user.save();
      console.log("user added", idNo)
      res.cookie("id", idNo);
      res.cookie("user", userName);
      res.cookie("score", score);
      idNo += 1
      fs.writeFileSync("UserId.txt", idNo.toString())


      res.json({ message: "User saved successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error saving user" });
    }
  }
});
//leaderbord data storage
function top10(user) {
  let arr = [];

  const data = fs.readFileSync("Top10.txt", "utf-8");
  arr = JSON.parse(data)
  user.date = moment().format("YYYY-MM-DD");

  arr.push(user);
  arr.sort((a, b) => b.score - a.score);
  if (arr.length > 10) {
    arr.pop();
  }

  fs.writeFileSync("Top10.txt", JSON.stringify(arr));


}



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
