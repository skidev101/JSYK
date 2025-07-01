const admin = require("../config/firebase");
const verifyToken = (req, res, next) => {
  const token = req.headers.Authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = admin.auth().verifyIdToken(token);
    const firebaseUser = admin.auth().getUser(decodedToken.uid);
    req.user = {
      uid: decodedToken.uid,
      username: firebaseUser.displayName || "Anonymous",
      email: firebaseUser.email || "",
      profileImgUrl: firebaseUser.photoURL || "",
    };
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
