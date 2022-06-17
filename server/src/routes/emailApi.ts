module.exports = (router: any, email: any) => {

  router.post('/', (req: any, res: any) => {
    email.sendEmail()
    .then(() => res.status(200).json('Email Sent'))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  return router;
};