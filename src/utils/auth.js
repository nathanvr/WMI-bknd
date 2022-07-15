const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.header;

    if (!authorization) {
      throw new Error("Expired session auth");
    }

    const [_, token] = authorization.split;

    if (!token) {
      throw new Error("Expired seddion token");
    }

    const { id, email } = jwt.verify(token, process.env.JWT_KEY);

    req.user = id;
    req.email = email;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
