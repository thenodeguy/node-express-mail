'use strict';

module.exports = {
    prod: {
      test: {
        port: 25,
        from: '<enter from address here>',
        to: '<enter to address here>',
        subject: '<enter subject here>',
        message: '<enter message here>'
      }
    },
    dev: {
      test: {
        port: 25,
        from: 'root@localhost',
        to: 'root@localhost',
        subject: 'This is a test subject line',
        message: 'This is a test email'
      }
    }
};
