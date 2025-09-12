import admin from "../config/firebase.js";
import { sanitizeDisplayName } from "../utils/usernameUtils.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const firebaseUser = await admin.auth().getUser(decodedToken.uid);

    const rawDisplayName = firebaseUser.displayName || "";
    const fallbackUsername = `user${Math.floor(Math.random() * 10000)}`;
    const username =
      req.body?.username ||
      sanitizeDisplayName(rawDisplayName) ||
      fallbackUsername;

    req.user = {
      uid: decodedToken.uid,
      username,
      email: firebaseUser.email || "",
      profileImgUrl: firebaseUser.photoURL || "",
    };
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ error: "Invalid token" });
  }
};

