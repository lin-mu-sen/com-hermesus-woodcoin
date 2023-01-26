import { readFileSync } from "fs"
import { join } from "path"
import { Algorithm } from "jsonwebtoken"

var i  = 'WOODCOIN DEVELOPEMENT LTD';          // Issuer 
var s  = 'contact@woodcoin.org';        // Subject 
var a  = 'https://woodcoin.org'; // Audience// SIGNING OPTIONS
export const signOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "12h",
 algorithm: 'RS256' as Algorithm
};
export const privateKEY = readFileSync(join(__dirname, '../../serverkey/rsa.key'), 'utf8');
export const publicKEY  = readFileSync(join(__dirname, '../../serverkey/rsa.key.pub'), 'utf8');