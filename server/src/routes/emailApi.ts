module.exports = (router: any, db: any) => {

  router.post('/', (req: any, res: any) => {
    res.send("brokey?");
  });

  return router;
};