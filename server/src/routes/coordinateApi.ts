module.exports = (router: any, db: any) => {

  // Add coordinates to db
  router.post('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    const { lat, long, time } = req.body;
    db.addCoordinate(Number(imei), lat, long, time)
    .then(() => res.status(200).json('Coordinate Added'))
    .catch((err: any) => {
      res.status(500).json(err.name);
      console.log(err)});
  });

  // Get most recent coord from db for specified imei
  router.get('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    db.getCoordinate(Number(imei))
    .then((data: any) => res.send(data.dataValues))
    .catch((err: any) => res.send(err));
  });
  
};