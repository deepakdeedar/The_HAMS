const handleDoctor = (req, res, db, bcrypt) => {
    var d = new Date();
    const { name, email, password, phone } = req.body;
    if (!email || !name || !password || !phone) {
      return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("doctors")
            .returning("*")
            .insert({
              email: loginEmail[0],
              name: name,
              phone: phone
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => res.status(400).render('registerDoctor', {year: d.getFullYear(), error: true, message: 'Unable to register.'}));
  };
  
  module.exports = {
      handleDoctor: handleDoctor
  }