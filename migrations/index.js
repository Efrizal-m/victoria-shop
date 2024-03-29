const pool = require('../config/connection.js')

const usersQuery =
`
CREATE TABLE "Users" (
    "_id" SERIAL PRIMARY KEY,
    "email" VARCHAR(50) UNIQUE NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "profile_image" VARCHAR(200)
);`


const bannersQuery =
`
CREATE TABLE "Banners" (
    "_id" SERIAL PRIMARY KEY,
    "banner_name" VARCHAR(30) NOT NULL,
    "banner_image" VARCHAR(200) NOT NULL,
    "description" VARCHAR(60) NOT NULL
);`


const servicesQuery =
`
CREATE TABLE "Services" (
    "_id" SERIAL PRIMARY KEY,
    "service_code" VARCHAR(30) NOT NULL,
    "service_name" VARCHAR(30) NOT NULL,
    "service_icon" VARCHAR(200) NOT NULL,
    "service_tariff" INTEGER NOT NULL
);`


const balancesQuery =
`
CREATE TABLE "Balances" (
    "_id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "balance_amount" INTEGER NOT NULL,
    "created_on" DATE NOT NULL,
    "updated_on" DATE NOT NULL
);`


const transactionsQuery =
`
CREATE TABLE "Transactions" (
    "_id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "invoice_number" VARCHAR(30) NOT NULL,
    "service_code" VARCHAR(30) NOT NULL,
    "service_name" VARCHAR(30) NOT NULL,
    "transaction_type" VARCHAR(30) NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "created_on" DATE NOT NULL,
    "updated_on" DATE NOT NULL
);`


pool.query(usersQuery)
    .then(_ => { console.log('create users table succes')})
    .catch(err => { console.log(err) })
pool.query(bannersQuery)
    .then(_ => { console.log('create banners table succes')})
    .catch(err => { console.log(err) })
pool.query(servicesQuery)
    .then(_ => { console.log('create services table succes')})
    .catch(err => { console.log(err) })    
pool.query(balancesQuery)
    .then(_ => { console.log('create balances table succes')})
    .catch(err => { console.log(err) })    
pool.query(transactionsQuery)
    .then(_ => { console.log('create transactions table succes')})
    .catch(err => { console.log(err) })