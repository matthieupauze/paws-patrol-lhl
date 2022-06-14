module.exports = (router: any, db: any) => {
  router.get('/', (req: any, res: any) => {
    res.send('reset');
  });
};