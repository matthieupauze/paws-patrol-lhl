module.exports = (router: any, db: any) => {
  router.get('/', (req: any, res: any) => {
    res.send('all perimeters');
  });

  router.post('/:imei', (req: any, res: any) => {
    res.send('add perimeter')
  });

  router.get('/:imei', (req: any, res: any) => {
    res.send('one perimeter');
  });

  router.patch('/:imei', (req: any, res: any) => {
    res.send('updated perimeter');
  });

  return router;
};