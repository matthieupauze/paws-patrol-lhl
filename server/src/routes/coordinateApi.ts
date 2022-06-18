import { checkPerimeter } from '../helpers/perimeter-helpers';

module.exports = (router: any, db: any) => {
  // Add coordinates to db
  router.post('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    const { lat, long, time } = req.body;

    db.getCoordinate(Number(imei))
      .then((data: any) => {
        checkPerimeter(imei, { latitude: lat, longitude: long, time }, data, db);
      })
      .catch((err: any) => {
        console.log(err);
      });

    db.addCoordinate(Number(imei), lat, long, time)
      .then(() => res.status(200).json('Coordinate Added'))
      .catch((err: any) => {
        res.status(500).json(err.name);
        console.log(err);
      });
  });

  // Get most recent coord from db for specified imei
  router.get('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    db.getCoordinate(Number(imei))
      .then((data: any) => res.send(data))
      .catch((err: any) => res.send(err));
  });
};
