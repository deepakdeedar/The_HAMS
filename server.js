const sgMail = require("@sendgrid/mail");

sgMail.setApiKey("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");
const msg = {
  to: 'deedarsingla@gmail.com', // Change to your recipient
  from: 'thehams24@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })