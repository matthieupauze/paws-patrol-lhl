module.exports = (router: any, db: any) => {
  // Get user
  router.get('/', (req: any, res: any) => {
    db.getUser()
    .then((data: any) => res.status(200).json(data))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.patch('/', (req: any, res: any) => {
    res.send('userPatch');
  });

  return router;
};