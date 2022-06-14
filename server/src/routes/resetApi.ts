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

  return router
};