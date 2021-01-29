const crypto = require('crypto')

function signToken(token) {
    const signerObject = crypto.createSign("RSA-SHA256");
    signerObject.update(token);
    return signerObject.sign({
        key: process.env.RSA_SHA_256_PRIVATE_KEY,
        padding:
            crypto.constants.RSA_PKCS1_PSS_PADDING
    }, "base64");
}

module.exports = {
    createToken: (payload) => {
        const headerEncoding = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
        const payloadEncoding = Buffer.from(JSON.stringify(payload)).toString('base64')
        const signature = signToken(`${headerEncoding}.${payloadEncoding}`)
        return `${headerEncoding}.${payloadEncoding}.${signature}`
    },

    auth: (req, res, next) => {
        const verifierObject = crypto.createVerify("RSA-SHA256");
        verifierObject.update(str);
        const verified = verifierObject.verify({ key: process.env.RSA_SHA_256_PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_PSS_PADDING }, signature, "base64");
        console.info("is signature ok?: %s", verified);
        next
    }
}