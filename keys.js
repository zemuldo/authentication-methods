
const crypto = require('crypto')

crypto.generateKeyPair('rsa', {
        modulusLength: 1024,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    }, (err, publicKey, privateKey) => {
        if (!err) {
            process.env.RSA_SHA_256_PRIVATE_KEY = privateKey
            process.env.RSA_SHA_256_PUBLIC_KEY = publicKey
            return;
        }
        else throw err
    })
process.env.HMAC_SHA_256_SECRET = crypto.randomBytes(20).toString('hex')
