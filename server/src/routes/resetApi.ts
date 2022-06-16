module.exports = (router: any, db: any) => {
  // Get route to reset DB
  router.get('/', (req: any, res: any) => {
    db.resetDB()
      .then(() => res.send('DB Reset'))
      .catch((err: any) => {
        console.log(err);
        res.status(500).json('An error occured, DB not reset');
      });
  });

  // Get route to reset and seed DB
  router.get('/seed', (req: any, res: any) => {
    db.seedDB()
      .then(() => res.send('DB Reset and seed'))
      .catch((err: any) => {
        console.log(err);
        res.status(500).json('An error occured, DB not reset');
      });
  });

  return router;
};
