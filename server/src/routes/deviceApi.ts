module.exports = (router: any, db: any) => {
  router.get('/', (req: any, res: any) => {
    db.getDevices()
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  return router;
};