


import admin from 'firebase-admin';
import { getMessaging } from 'firebase-admin/messaging';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountKey = process.env.FIREBASE_ADMIN_SDK_JSON_PATH;

if (!serviceAccountKey) {
  throw new Error('FIREBASE_ADMIN_SDK_JSON environment variable is not defined.');
}

let serviceAccount: any;

try {
  serviceAccount = JSON.parse(serviceAccountKey);
} catch (error: any) {
  throw new Error('Failed to parse FIREBASE_ADMIN_SDK_JSON environment variable: ' + error.message);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushMessageFromAdminToUser = (messageText: string, title: string, token: string, link:string) => {
  try {
    

    console.log(token, messageText, title , link+ "😥😣😣😣😣😣");
    console.log(link);

    const message = {
      notification: {
        title: title,
        body: messageText
      },
      token: token,
      
      webpush: {
        fcmOptions: {
          link: link
        }
      }
    };

    getMessaging().send(message)
      .then((response) => {
        console.log(response)
        return response
      })
      .catch((err) => {
        console.log(err)
       return err
      });

  } catch (error) {
    console.log(error);
   return error
  }
};


export const sendPushMessage = (messageText: string, title: string, tokens: string[], link: string) => {
  try {
    const promises = tokens.map((token) => {
      const message = {
        notification: {
          title: title,
          body: messageText,
        },
        token: token,
        webpush: {
          fcmOptions: {
            link: link,
          },
        },
      };

      return getMessaging().send(message)
        .then((response) => {
          console.log(`Message sent to ${token}: ${response}`);
          return response;
        })
        .catch((err) => {
          console.log(`Error sending to ${token}: ${err}`);
          return err;
        });
    });

    return Promise.all(promises)
      .then((responses) => {
        console.log('All messages sent:', responses);
        return responses;
      })
      .catch((error) => {
        console.log('Error in sending messages:', error);
        return error;
      });

  } catch (error) {
    console.log('Unexpected error:', error);
    return error;
  }
};




