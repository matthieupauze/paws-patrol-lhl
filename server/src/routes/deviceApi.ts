module.exports = (router: any, db: any) => {
  router.get('/', (req: any, res: any) => {
    db.getDevices()
      .then((data: any) => res.status(200).json(data))
      .catch((err: any) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    const { name } = req.body;
    db.addDevice(imei, name)
      .then((data: any) => {
        db.addPerimeter(imei, { lat: 0, long: 0 }, { lat: 0, long: 0 });
        res.status(200).json(data);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:imei', (req: any, res: any) => {
    db.getDevice(req.params.imei)
      .then((data: any) => res.status(200).json(data))
      .catch((err: any) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.patch('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    const { name, microchip } = req.body;
    db.updateDevice(imei, name, microchip)
      .then((data: any) => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  return router;
};
