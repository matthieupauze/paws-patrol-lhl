module.exports = (router: any, db: any) => {
  // Get route to reset DB
  router.get('/', (req: any, res: any) => {
    db.resetDB();
    res.send('DB Reset');
  });
};