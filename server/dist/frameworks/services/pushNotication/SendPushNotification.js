"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushMessage = exports.sendPushMessageFromAdminToUser = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const messaging_1 = require("firebase-admin/messaging");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const serviceAccountKey = process.env.FIREBASE_ADMIN_SDK_JSON_PATH;
if (!serviceAccountKey) {
    throw new Error('FIREBASE_ADMIN_SDK_JSON environment variable is not defined.');
}
let serviceAccount;
try {
    serviceAccount = JSON.parse(serviceAccountKey);
}
catch (error) {
    throw new Error('Failed to parse FIREBASE_ADMIN_SDK_JSON environment variable: ' + error.message);
}
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
const sendPushMessageFromAdminToUser = (messageText, title, token, link) => {
    try {
        console.log(token, messageText, title, link + "😥😣😣😣😣😣");
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
        (0, messaging_1.getMessaging)().send(message)
            .then((response) => {
            console.log(response);
            return response;
        })
            .catch((err) => {
            console.log(err);
            return err;
        });
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.sendPushMessageFromAdminToUser = sendPushMessageFromAdminToUser;
const sendPushMessage = (messageText, title, tokens, link) => {
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
            return (0, messaging_1.getMessaging)().send(message)
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
    }
    catch (error) {
        console.log('Unexpected error:', error);
        return error;
    }
};
exports.sendPushMessage = sendPushMessage;
