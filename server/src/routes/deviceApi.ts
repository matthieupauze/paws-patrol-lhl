module.exports = (router: any, db: any) => {

  router.post('/', (req: any, res:any) => {
    const { imei, name } = req.body;
    db.addDevice(imei, name)
    .then( (data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.get('/', (req: any, res: any) => {
    db.getDevices()
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.post('/:imei', (req: any, res: any) => {
    const { name } = req.body;
    res.send(name);
  });

  router.get('/:imei', (req: any, res: any) => {
    db.getDevice(req.params.imei)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  return router;
};