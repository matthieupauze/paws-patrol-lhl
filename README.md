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



# Api

# Coordinates
```

/api/coordinate

post /:imei 
	add coordinate for a device
	body = {lat, long, time}
	all required

get /:imei
	get most recent for a device

```

# Devices
```

/api/device

get /
	list of all devices

post /:imei
	add device
	body = {name, microchip}
	all optional	
get /:imei
	info about device with matching imei
patch /:imei 
	update a device
	body = {name, microchip}
	all optional

```

# Email
```

/api/email

post /
	send an email
	body = {to, subject, body}
	to is required
	subject and body are optional

```

# Perimeters
```

/api/perimeter

get /
	get all perimeters in db

post /:imei
	add perimeter for a device
	body = {p1lat, p1long, p2lat, p2long}
	all required
get /:imei
	get perimeter for device with matching imei
patch /:imei
	update perimeter for a device
	body = {p1lat, p1long, p2lat, p2long}

```

# Reset
```

/api/reset

get / 
	reset db leaving it empty

get /seed 
	reset db before seeding with dummy data
	1 device, user, coordinate, and perimeter

```

# Trips
```

/api/trip

get /
	get all trips

post /:imei
	start a trip
	body = {name, start}
	name is optional
	start is required
get /:imei
	get all trips for a device with matching imei
patch /:imei
	end a trip
	body = {id, end}
	both required

get /:imei/:id
	get the coordinates for a trip 

```

# Users
```

/api/user

get /
	get user info
patch /
	change user info
	body = {name, phone, email, password}
	all required

```




