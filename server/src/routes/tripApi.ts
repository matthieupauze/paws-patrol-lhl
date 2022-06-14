module.exports = (router: any, db: any) => {
  // send all trips
  router.get('/', (req: any, res: any) => {
    res.send('trip');
  });

  // add a new trip using start time
  router.post('/:imei', (req: any, res: any) => {
    res.send('start trip');
  });

  // get all trips for 1 device
  router.get('/:imei', (req: any, res: any) => {
    res.send('get trip');
  });

  // end a trip with end time
  router.patch('/:imei', (req: any, res: any) => {
    res.send('finish trip');
  });

  return router;
};