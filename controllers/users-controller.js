import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  console.log(process.env.MYSQLPASSWORD);
  const q = "SELECT * FROM users WHERE userId=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");
  // jwt verification returns error or the encrpted value being verified i.e userInfo could be given any variable name
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    console.log(userInfo);
    const q = "UPDATE users SET `username`=? WHERE userId=? ";

    db.query(
      q,
      [req.body.username,userInfo.userId],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your account");
      }
    );
  });
};
