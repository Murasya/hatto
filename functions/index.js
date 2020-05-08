const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
})

exports.sendMail = functions.https.onCall((data, context) => {
    let email = {
        from: gmailEmail,
        to: data.destination,
        subject: 'test message',
        text: 'This is a test message from vue.'
    }
    mailTransport.sendMail(email, (err, info) => {
        if (err) {
            return console.log(err)
        }
        return console.log('success')
    })
})

admin.initializeApp();
exports.qandaList = functions.https.onRequest((request, response) => {
    const db = admin.firestore();
    const ordersRef = db.collection('questionAndAnswer');
    return ordersRef.get().then((querySnapshot) => {
        const orders = [];
        querySnapshot.forEach(doc => {
            const order = doc.data();
            orders.push(order);
        });
        response.setHeader(
            "Content-disposition",
            "attachment; filename=qanda.json"
        );
        response.set("Content-Type", "application/json");
        response.status(200).send(orders);
        return ""
    }).catch((err) => {
        response.status(200).send("エラー発生：" + err);
        return Promise.resolve();
    });
})