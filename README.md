# NodeJS MongoDB GeoNear API Demo

A sample NodeJS/Koa2 and MongoDB API project demonstrating how GeoNear works

### Dependencies

---

1. node >= 10.0.0
2. MongoDB >= 3.6.1

### Installation

---

`npm install or yarn install`

### Starting the server

---

> This requires MongoDB to be up and running on your system. If you have authentication on your db access, change `src/config/get-config.js` accordingly.

For dev,
`npm run start:dev or yarn run start:dev`


For prod,
`npm run start:prod or yarn run start:prod`

> When starting server 1st time, it'll insert some dummy data into your database.

# API Endpoints

### Find nearby rides

Find all the available rides within the area of 5 km.

```
URL: http://localhost:4000/api/v1/rides/nearby
Type: GET
URL params:
1. lat - Number - Required
2. lng - Number - Required
```

Try, `http://localhost:4000/api/v1/rides/nearby?lng=-80&lat=25.780`

### Get past rides

See all the past rides.

```
URL: http://localhost:4000/api/v1/rides/history
Type: GET
```

### Request a ride

Finds and assigns a ride to you and inserts a document in the orders collection.

```
URL: http://localhost:4000/api/v1/rides/history
Type: POST
Body: {
  "from": [lng: Number, lat: Number], // Required
  "to": [lng: Number, lat: Number]    // Required
}
```

Thank you.
