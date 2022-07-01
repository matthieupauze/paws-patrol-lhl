Robbie:
Do you let your cat roam freely throughout the neighbourhood but want to know where exactly she is?
Has your dog ever darted out the front door the second he gets a chance?
Or Maybe you want to know exactly where your kids are!
Well here comes Paw-Patrol!The single page open source app that pairs with open source Arduino and Botletics hardware for acurate GPS tracking of your pet and child!

# Introductions

Robbie:
Hi my name is Robbie and before Lighthouse I was an English teacher for kids aged 5-15

Brent:
Hi my name is Brent and before Lighthouse I was a cold pilger operator.

Matt:
Hi my name is Matt and before Lighthouse I was working in customer service.

# Inspirations

Robbie :
The inspiration for this app came a few weeks ago when the wind opened the gate to my front yard and my dog decided to go on a solo adventure. It took me about 9 hours to find that somebody brought her to the local vet. It would have been really nice to have had a GPS device attached to her collar.

Now Brent will talk about how the app is desinged to function

### 1min 3sec

## 1 min

# 1m 1s

Brent:

<p>
  Paw-Patrol is designed to protect your pets and you by always knowing where they are. Open source software allows you to know your devices are only talking to you and gives anyone the ability to self-host the server themselves. This app is targetted towards people with a healthy level of paranoia.
</p>

<p>
  The client side of the app is built using React, React-Router, and leaflet for it's map API. We experimented with using vite as a build tool.
</p>

<p>
  The server is built with Express, Sequelize, and Typescript and uses sendInBlue to send emails to users. The hardware is programmed using C++.
  Now I will let Matthieu give a proper demo of the app. 
</p>
---

### 1min 45s

# 1m 38s

# 1m 38s

# Walk-through

Matthieu:

## Login Page

- Click login to go to main map

## Track page

- Start with Start Tracking button.
- Mention a default device has already been set
- Change to Dark Mode

- Start with Start Tracking button.
- Mention a default device has already been set
- Change to Dark Mode

## Devices page

- Mention that we can add a new device and remove others
- Add one quickly (not full details, maybe just 1,2,3)
- Quickly delete a device

### 2 min 45s

## 2m 7s

## Perimeter page

- Add a Perimeter. Make it big so that it is visually clear for the presentation. It doesn't need to be on one specific house or yard.

## 2m 25s

## 2m 30s

## Account page

- User updates an element to show toast. Make a minor change to make it quick

Robbie:

## Perimeter page

- Add a Perimeter. Make it big so that it is visually clear for the presentation. It doesn't need to be on one specific house or yard.

## Account page

- Quickly fill out information and then sends an email, sent via the sendInBlue API. (again, maybe just 1,2,3)

---

### 3 min 55s

# 3m 10s

# 3m 13s

# Further Development ~ Stretch

Matthieu:

<p>
  In the future we would like to integrate Twilio so the user can also receive an SMS, replace bootstrap with custom scss, move to a smaller tracking device, and dockerize the software to allow easier deployment for self-hosting.
  Robbie on to you
</p>

Robbie:

<p>
  We would also like to add more statistical features that track time spent on a walk, distance travelled, max speed of the animal, and calories burnt, and be able to have filterable trips with a replay of where the pet went.

Now Brent will talk about some of the challenges we faced along the way

</p>

### 4min 40s

## 4m

# 3m 57s

Brent:

<p>
  Some challenges were

- Use of different languages, such as typescript on the backend, python for device simulation, and c++ for programming the Arduino.
- Getting the physical device to work.
- Trying to find support for our specific Arduino setup(library + device).

Now Robbie Will share some final thoughts

</p>

Robbie:

<p>So for any of you pet lovers (or helicopter parents), build this device, keep track of your pet (or kid) to have some peace of mind knowing they are safe. Thank you for watching our presentation and thank you Lighthouse for helping us to become full stack developpers! </p>

# 5min 20s

# 4min 36s
