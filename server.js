const express = require('express')
const app = express()
const PORT = 9090
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))

const server = "127.0.0.1:27017";
const name = "taskDB";
class database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoos
      .connect(`mongoodb://${server}/${name}`)
      .then(() => {
        console.log("database connecton succesful");
      })
      .catch((err) => {
        console.error("database connection failed");
      });
  }
}

const taskSchema = {
    task:String
}

const Task = mongoose.model('Task',taskSchema)



app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname+ "/src"))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/index.html"));
});
app.get("/task", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/task.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/error.html"));
});


app.post("/task",(req,res)=>{
    let nawTask = new Task({
        task : req.body.cont
    })
    console.log(req)
    nawTask.save()
    res.redirect('/task')
})

app.listen(PORT,()=>{
    console.log(PORT)
})

