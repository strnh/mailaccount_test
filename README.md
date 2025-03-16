## README

* for qmail/vpopmail to postfix/dovecot server migration
* pop3 test

## REQUIREMENT

* [swaks]('https://https://github.com/jetmore/swaks')
* node (version v22..)
* [node-tcp]('https://github.com/nubosoftware/node-tcp/')

## Files

- mail-test.sh : smtp-auth test 
      authinfo <|... vpasswd 
      body     <|... test.txt
- pop3.js  :  pop3 (110/tcp)  server test
- pop3s.js :  pop3s (995/tcp) server test
      authinfo <|... users.json 
