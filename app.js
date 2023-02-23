const express = require('express')
const bodyParser=require('body-parser')
const db = require('./config/db')
const dotenv=require('dotenv')
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({
    path:'./config/.env'
})
db()


const fileRouter=require('./Router/fileRouter')

app.get('/', (req,res) => {
    res.render("index");
})

app.use('/api/files', fileRouter)



const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
    console.log("Server Listening... on Port : ",PORT);
})