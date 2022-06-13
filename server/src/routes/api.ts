module.exports = (router: any, db: any) => {

  // Get route to reset DB
  router.get('/reset', function(req: any, res: any) {
    db.resetDB();
    res.send("DB Reset");
  });

  router.get('/', (req: any, res: any) => {
    res.send("Nothing to see here!");
  });

  router.post('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    const { lat, long } = req.body;
    db.addCoordinates(Number(imei), lat, long);
    res.send(`imei: ${imei} lat: ${lat} long: ${long}\n`);
  });

  return router;

};
