import fs from 'fs';
// // this algo is used to store data of 10 scoring usres which is showing in leader bord

 function top10(user) {
  let arr = [];

  const data = fs.readFileSync("Top10.txt", "utf-8");
  arr=JSON.parse(data)
  arr.push(user); 
  arr.sort((a, b) => b.score - a.score);  
  if (arr.length > 10) {
    arr.pop(); 
  }

  fs.writeFileSync("Top10.txt", JSON.stringify(arr));
  console.log("User added to Top 10");
  console.log(arr[9].score);
}

// let user = {
 
//   name: "Raiplus",
//   score: 9999
 
// };

top10(user);
let arr=[{name:"ashish"}]
arr[0].rank=1
console.log(arr)


const currentDate = new Date();
console.log(currentDate);
let user={name:"Rishabh"}
user.Date=currentDate
console.log(user)