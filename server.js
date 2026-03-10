const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const FILE = "reports.json"


// get all reports
app.get("/reports", (req,res)=>{

let data = fs.readFileSync(FILE)

res.json(JSON.parse(data))

})


// save new report
app.post("/report",(req,res)=>{

let report = req.body

let data = JSON.parse(fs.readFileSync(FILE))

data.push(report)

fs.writeFileSync(FILE,JSON.stringify(data,null,2))

res.json({message:"Report Saved"})

})

app.listen(3000,()=>{

console.log("Server running on http://localhost:3000")

})