module.exports = (router: any, email: any) => {

  router.post('/', (req: any, res: any) => {
    const { to, subject, body } = req.body;
    email.sendEmail(to, subject, body)
    .then(() => res.status(200).json('Email Sent'))
    .catch((err: any) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  return router;
};