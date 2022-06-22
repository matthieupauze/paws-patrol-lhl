const sendEmail = require('../routes/helpers/sendMail');

interface Coord {
  latitude: Number; // This is up-down
  longitude: Number; // This is left-right
  time: Date;
}

interface Point {
  lat: Number;
  long: Number;
}

const inBounds = (bounds: Point[], location: Coord): Boolean => {
  if (
    bounds[0].lat > location.latitude &&
    bounds[1].lat < location.latitude &&
    bounds[0].long < location.longitude &&
    bounds[1].long > location.longitude
  ) {
    return true;
  }
  return false;
};

const checkPerimeter = async (imei: Number, oldLocation: Coord, newLocation: Coord, db: any) => {
  const { p1lat, p1long, p2lat, p2long } = await db.getPerimeterByIMEI(imei);
  const bounds = [
    { lat: p1lat, long: p1long },
    { lat: p2lat, long: p2long },
  ];

  if (inBounds(bounds, oldLocation) && !inBounds(bounds, newLocation)) {
    sendEmail('pawspatrol2022@gmail.com', 'Paw Patrol', 'Pet gone... look for them or something')
      .then(() => console.log('Alert sent!'))
      .catch(() => console.log('Learn to code better!'));
  }
};

export { checkPerimeter };
