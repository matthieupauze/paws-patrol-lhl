# Paws patrol

Paws Patrol is designed to protect your pets and you. Always know where your pets are without anyone else able to do the same.  
Self-hosting allows you to choose your own middleware (ex. authelia, pomerium) for login while also providing security.  
Open source software allows you to know your devices are only talking to each other.

## Setup

```js
cd server
npm run build && npm start
cd ../app
npm run dev
```

## Dependencies

- Node 16.x
- Postgres 10.x
- Express
- Bootstrap 5

## Api Routes

- api/device

```
  get / list of all devices

	post /:imei add a device manually/change name
	get /:imei info about 1 device
	patch /:imei update a device
```

- api/trip

```
	get / get all trips

	post /:imei start a trip
	get /:imei get all trips for single device
	patch /:imei end a trip

	get /:imei/:id get the coordinates for the trip
```

- api/coordinates

```
	post /:imei add coordinate for a device
	get /:imei get most recent for a device
```

- api/user

```
	post / change user info
	get / user info
```

- api/perimiter

```
	get / all perimeters

	post /:imei add perimiter for device
	get /:imei perimiter for single device
	patch /:imei update perimiter values
```

api/reset

```
	get / reset db
```
