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
        let token = req.headers.authorization
        if (!token) return res.status(401).send('Missing authorization data')
        token = token.split('Bearer ')[1]
        const tookenParts = token.split('.')
        const headerPlusPayload = `${tookenParts[0]}.${tookenParts[1]}`
        const signature = tookenParts[2]
        const verifierObject = crypto.createVerify("RSA-SHA256");
        verifierObject.update(headerPlusPayload);
        const verified = verifierObject.verify({
            key: process.env.RSA_SHA_256_PUBLIC_KEY,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING
        }, signature, "base64");
        if (verified) next()
        else return res.status(401).send({ error: 'Unauthorized', code: 'invalid_token'})
    }
}