# victoria-shop

To start Locally, please create config/env.js and copy this:
```
const env = {
    port: 3000,
    jwt_secret: "victoria",
    expires: "12h",

    user:'postgres',
    host:'localhost',
    database:'vs',
    password:'postgres',
    dbport:5432,
}
module.exports = env
```

then run this script in root directory:
```
npm run db:migrate
npm run db:seed:all
npm i
npm run dev
```

#