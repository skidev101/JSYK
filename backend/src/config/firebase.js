const admin = from "firebase-admin");

const serviceAccountJSON = Buffer.from(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64,
  "base64"
).toString("utf-8");

const serviceAccount = JSON.parse(serviceAccountJSON);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin; 