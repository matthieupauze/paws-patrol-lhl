module.exports = (router: any, db: any) => {
  router.get('/', (req: any, res: any) => {
    db.getPerimeters()
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.post('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    const { left, right } = req.body;
    db.addPerimeter(imei, left, right)
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.get('/:imei', (req: any, res: any) => {
    res.send('one perimeter');
  });

  router.patch('/:imei', (req: any, res: any) => {
    res.send('updated perimeter');
  });

  return router;
};