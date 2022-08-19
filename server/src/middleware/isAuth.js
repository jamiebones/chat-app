import jwt from "jsonwebtoken";

const { secret_key } = process.env;

export default (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader) {
    return res
      .status(403)
      .send("No authorization headers was sent with the request");
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    let decodedToken = jwt.verify(token, secret_key);
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
};
