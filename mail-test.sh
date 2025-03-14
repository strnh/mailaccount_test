# Name: mail-test
#
# 
# Require: vpopmail/domains/*/vpasswd(with non-encrypt password) 
#          swaks
#
# 
#
testreceiver=test@example.com
crypt="PLAIN"
testserver="127.0.0.1"
senderdomain="example.dom"

awk 'BEGIN {FS=":"}
     length($NF)>0{ 
       split($6,fpath,"/"); 
       mailaddress=$1"@"fpath[6]; 
       sender=$1 "@'${senderdomain}'"
       print   "swaks --tls --port 587 --server '"${testserver} "' -t '" ${testreceiver} "' --from " sender " --auth '"${crypt}"' --auth-user " mailaddress " --auth-password "$NF" <test.txt " 
     }' < vpasswd 
