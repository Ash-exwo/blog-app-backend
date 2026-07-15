const Express = require("express")
const Mongoose = require("mongoose")
const Bcrypt = require("bcrypt")
const Cors = require("cors")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")

let app = Express()

app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb://aswathy:ashexhere22@ac-d01d9ty-shard-00-00.36nhatr.mongodb.net:27017,ac-d01d9ty-shard-00-01.36nhatr.mongodb.net:27017,ac-d01d9ty-shard-00-02.36nhatr.mongodb.net:27017/blogdb?ssl=true&replicaSet=atlas-sg5pws-shard-0&authSource=admin&appName=Cluster0")

app.post("/sign-up", async (req,res)=>{
    // input
    let input = req.body
    //password encryption
    let hashedPassword = Bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password = hashedPassword
    userModel.find({email:req.body.email}).then(
        (items)=>{
            //to check whether the entered email is alredy in the db or not - search result comes inside the "items" which return an array

            // console.log(items)
            if (items.length>0) { //if "check" s length>0 ? then mail id already exists
                res.json({"status":"emailId already exists"})
            } else {
                let result = new userModel(input) //passed the data to userModel if the email id didnt exists
                result.save() //store data - async-await() - mongodb colud or any n/w application storing issues will be done in the bg -safety method -asynchronous fn
                res.json({"status":"success"}) //1 api - 1 res
            }
        }
    ).catch(
        (error)=>{

        }
    )

    })

app.listen(3001, ()=>{
    console.log("Server Started")
})


