module.exports = (router: any, db: any) => {
  // send all trips
  router.get('/', (req: any, res: any) => {
    db.getTrips()
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  // add a new trip using start time
  router.post('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    const { name, start } = req.body;
    db.addTrip(imei, start, name)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  // get all trips for 1 device
  router.get('/:imei', (req: any, res: any) => {
    db.getTripsByIMEI(req.params.imei)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  // end a trip with end time
  router.patch('/:imei', (req: any, res: any) => {
    res.send('finish trip');
  });

  return router;
};