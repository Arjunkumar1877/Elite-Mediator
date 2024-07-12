import admin from 'firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';
import { Req, Res } from '../../types/ServerTypes';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_ADMIN_SDK_JSON_PATH;

if (!serviceAccountPath) {
  throw new Error('FIREBASE_ADMIN_SDK_JSON_PATH environment variable is not defined.');
}
const serviceAccountAbsolutePath = path.resolve(__dirname, serviceAccountPath);
const serviceAccount = require(serviceAccountAbsolutePath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushMessage = (req: Req, res: Res) => {
  try {
    const token = req.body.token;

    const message = {
      notification: {
        title: "Arjun Kumar",
        body: "This is a Test Notification",
      },
      token: token,
    };

    getMessaging().send(message)
      .then((response) => {
        res.json({ message: "success", token });
      })
      .catch((err) => {
        res.json(err);
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
