module.exports = (router: any, email: any) => {

  router.get('/', (req: any, res: any) => {
    email.sendEmail();
    res.send("brokey?");
  });

  return router;
};