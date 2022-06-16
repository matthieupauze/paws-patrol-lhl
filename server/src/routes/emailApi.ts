module.exports = (router: any, db: any) => {

  router.get('/', (req: any, res: any) => {
    res.send("brokey");
  });

  router.post('/', (req: any, res: any) => {
    res.send("brokey?");
  });

  return router;
};