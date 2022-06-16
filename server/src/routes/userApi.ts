module.exports = (router: any, db: any) => {
  // Get the user
  router.get('/', (req: any, res: any) => {
    db.getUser()
      .then((data: any) => res.status(200).json(data))
      .catch((err: any) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // Update the user
  router.patch('/', (req: any, res: any) => {
    const { name, phone, email, password } = req.body;
    db.updateUser(name, phone, email, password)
      .then((data: any) => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  return router;
};
