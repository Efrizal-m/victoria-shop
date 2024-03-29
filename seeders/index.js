const pool = require('../config/connection.js');
const fs = require('fs')

// read from local json
const banners = JSON.parse(fs.readFileSync(`${__dirname}/data/banners.json`, 'utf8'))
const services = JSON.parse(fs.readFileSync(`${__dirname}/data/services.json`, 'utf8'))

// create array to be inputted as insertMany in next query string statement
let arrBanners = []
for (let i = 0; i < banners.length; i++) {
    arrBanners.push(`('${banners[i].banner_name}','${banners[i].banner_image}','${banners[i].description}')`)
}
let arrServices = []
for (let i = 0; i < services.length; i++) {
    arrServices.push(`('${services[i].service_code}','${services[i].service_name}','${services[i].service_icon}','${services[i].service_tariff}','${services[i].description}')`)
}

const InsertBanners = 
`
INSERT INTO "Banners" ("banner_name","banner_image","description")
VALUES ${arrBanners.join(',')};
`
const InsertServices = 
`
INSERT INTO "Services" ("service_code","service_name","service_icon","service_tariff","description")
VALUES ${arrServices.join(',')};
`

pool.query(InsertBanners)
    .then(_ => { console.log('insert data banners succes')})
    .catch(err => { console.log(err) })
pool.query(InsertServices)
    .then(_ => { console.log('insert data services succes')})
    .catch(err => { console.log(err) })