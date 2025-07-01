const admin = require("../config/firebase");


const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split(" ")[1];


  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded Token:", decodedToken);
    const firebaseUser = await admin.auth().getUser(decodedToken.uid);
    console.log("Firebase User:", firebaseUser);
    req.user = {
      uid: decodedToken.uid,
      username: firebaseUser.displayName || req.body.username,
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
