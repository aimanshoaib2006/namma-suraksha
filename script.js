let reports = 0
let sos = 0

function show(id){

document
.querySelectorAll("section")
.forEach(s=>s.classList.add("hidden"))

document
.getElementById(id)
.classList.remove("hidden")

}


async function submitReport(){

let vehicle = document.getElementById("vehicle").value
let type = document.getElementById("type").value

navigator.geolocation.getCurrentPosition(async pos=>{

let lat = pos.coords.latitude
let lon = pos.coords.longitude

let report = {

vehicle,
type,
lat,
lon,
time:new Date()

}

await fetch("http://localhost:3000/report",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(report)

})

reports++

document.getElementById("rCount").innerText = reports

L.marker([lat,lon])
.addTo(map)
.bindPopup(type)

alert("Report Saved")

})

}



function sendSOS(){

navigator.geolocation.getCurrentPosition(pos=>{

let lat = pos.coords.latitude
let lon = pos.coords.longitude

sos++

document.getElementById("sCount").innerText=sos

document.getElementById("sosloc").innerText=

"Location: "+lat+" , "+lon

L.marker([lat,lon])
.addTo(map)
.bindPopup("SOS Alert")

})

}



let map = L.map('mapid').setView([12.9716,77.5946],13)

L.tileLayer(

'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

{

maxZoom:19

}

).addTo(map)



async function loadReports(){

let res = await fetch("http://localhost:3000/reports")

let data = await res.json()

data.forEach(r=>{

L.marker([r.lat,r.lon])
.addTo(map)
.bindPopup(r.type)

})

}

loadReports()