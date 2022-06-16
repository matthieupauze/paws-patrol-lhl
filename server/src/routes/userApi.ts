module.exports = (router: any, db: any) => {
  router.get('/', (req: any, res: any) => {
    res.send('user');
  });

  router.patch('/', (req: any, res: any) => {
    res.send('userPatch');
  });

  return router;
};