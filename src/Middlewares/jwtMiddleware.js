const jwt = require("jsonwebtoken");

exports.jwtMiddleware = (req, res, next) => {
  const key = process.env.SECRET_KEY;
  const token = req.headers["access_token"].split(" ")[1];
  try {
    const jwtresponse = jwt.verify(token, key);
    req.payload = jwtresponse.id;
    next();
  } catch (err) {
    res.status(401).json("Autherization failed , please login");
  }
};
