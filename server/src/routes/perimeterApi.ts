module.exports = (router: any, db: any) => {
  // Get all perimeters
  router.get('/', (req: any, res: any) => {
    db.getPerimeters()
      .then((data: any) => res.status(200).json(data))
      .catch((err: any) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Add a new perimeter based on imei
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

  // Get one perimeter based on imei
  router.get('/:imei', (req: any, res: any) => {
    db.getPerimeterByIMEI(req.params.imei)
      .then((data: any) => res.status(200).json(data))
      .catch((err: any) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Update one perimeter based on imei
  router.patch('/:imei', (req: any, res: any) => {
    const { imei } = req.params;
    const { left, right } = req.body;
    db.updatePerimeter(imei, left, right)
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
