# Introductions

Brent:
Hi my name is Brent and before Lighthouse I was a cold pilger operator.

Matt:
Hi my name is Matt and before Lighthouse I was working in customer service.

Robbie:
Hi my name is Robbie and before Lighthouse I was \*

# Inspirations

Robbie:
<p>
Tell story on how your dog disappeared for a day, and you had to spend 8+ hrs searching for him.
</p>

Brent:

<p>
  Paw-Patrol is designed to protect your pets and you. Always know where your pets are without anyone else able to do the same. Open source software allows you to know your devices are only talking to each other and gives anyone the ability to run the server themselves. Targetted towards people with a healthy level of paranoia.
</p>

# Walk-through

Matthieu:

<p>
  The client is built using React, React-Router, React-Bootstrap and leaflet for it's map API. We experimented with using vite as a build tool instead of the standard create-react-app.
</p>

Brent:

<p>
  The server is built with Express, PostgreSQL, and Typescript and uses sendInBlue to send emails to users if their pet leaves their perimeter.
</p>

Matthieu:

## Registration

- Don't touch buttons lol

## Login Page

- User clicks login and is greeted with a view of the map and the option to start tracking pet

Robbie:

## Satellite mode and dark mode

- User clicks buttons to toggle modes

Matthieu:

## Devices page

- User goes to devices to add a new device and remove others

Matthieu:

## Account page

- User updates an element to show toast

Robbie:

## Perimeter page

- User adds new perimeter and then deletes the default one

Brent:

## Contact page

- User fills out information and then sends an email, sent via the Sending Blue API

## Track page

- User goes to tracking page and starts tracking to watch points move in real time.

---

# Further Development ~ Challenges

Matthieu:

<p>
  In the future we would like to integrate Twilio so the user can also receive an SMS, replace bootstrap with custom scss, move to a smaller tracking device, and dockerize the software to allow easier deployment for self-hosting.
</p>

Brent:

<p>
  - Culmination of different languages, such as typescript on the backend, python for device simulation, and c++ for programming the Arduino.
  - Getting the physical device to work (shorted Arduino).
  - Trying to find support for our specific Arduino setup(library + device).
  - Vite as a build tool
</p>

Robbie:

<p>
  We would also like to add more statistical features that track time spent on a walk, distance travelled, max speed of the animal, and calories burnt, grouped into filterable trips.
</p>
