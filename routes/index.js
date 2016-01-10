'use strict';

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var mailConfig = require('../configs/mail');


router.get('/', function(req, res, next) {
  res.render('index');
});

/**
 * Sends a test email, defined in the mail config file.
 */
router.get('/send', function(req, res, next) {

  var templateDir = __dirname + '/../templates/test-email';
  var emailTemplate = new EmailTemplate(templateDir);
  
  var data = {
    message: mailConfig[process.env.NODE_ENV].test.message
  };
  
  emailTemplate.render(data, function (err, results) {
    if(err) {
      err = new Error('Unable to render email');
      err.status = 500;
      throw err;
    }

    // Send the email
    var mailOptions = {
      port: mailConfig[process.env.NODE_ENV].test.port,
      from: mailConfig[process.env.NODE_ENV].test.from,
      to: mailConfig[process.env.NODE_ENV].test.to,
      subject: mailConfig[process.env.NODE_ENV].test.subject,
      html: results.html
    };
      
    try {
      var transporter = nodemailer.createTransport();
      transporter.sendMail(mailOptions, function(err, info){
        if(err) {
          err.status = 500;
          throw err;
        }
      });
    }
    catch(err) {
        throw err;
    }
  });
  
  res.render('send');
});

module.exports = router;
