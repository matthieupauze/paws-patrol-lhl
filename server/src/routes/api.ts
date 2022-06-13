// Api Controller
module.exports = (router: any, db: any) => {
  // Get route to reset DB
  router.get('/reset', (req: any, res: any) => {
    db.resetDB();
    res.send('DB Reset');
  });

  router.get('/', (req: any, res: any) => {
    res.send('Nothing to see here!');
  });

  // Get most recent coord from db for specified imei
  router.get('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    db.getCoordinate(Number(imei))
    .then((data: any) => res.send(data.dataValues))
    .catch((err: any) => res.send(err));
  });

  // Add coordinates to db
  router.post('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    const { lat, long, time } = req.body;
    db.addCoordinates(Number(imei), lat, long, time);
    res.send(`imei: ${imei} lat: ${lat} long: ${long} time: ${time}\n`);
  });

  return router;
};
