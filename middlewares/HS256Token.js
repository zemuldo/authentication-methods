const crypto = require('crypto')

function signToken(token) {
    const hmac = crypto.createHmac('sha256', process.env.HMAC_SHA_256_SECRET);
    hmac.update(token);
    return hmac.digest('base64')
}

module.exports = {
    createToken: (payload) => {
        const headerEncoding = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64').replace(/=/g, '')
        const payloadEncoding = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '')

        const headerPluspayload = `${headerEncoding}.${payloadEncoding}`
        const hmac = crypto.createHmac('sha256', 'secret').update(headerPluspayload).digest()

        const signature = Buffer.from(hmac)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')

        return `${headerEncoding}.${payloadEncoding}.${signature}`
    },

    auth: (req, res, next) => {
        try {
            let token = req.headers.authorization
            token = token.split('Bearer ')[1]
            const tookenParts = token.split('.')
            const headerPlusPayload = `${tookenParts[0]}.${tookenParts[1]}`
            const signature = tookenParts[2]
            const sig = signToken(headerPlusPayload)
            if (signature === sig) next()
            else return res.status(401).send({ error: 'Unauthorized', code: 'invalid_token' })


        } catch (_) {
            return res.status(401).send({ code: 'invalid_request', message: 'Unauthorized' })
        }

    }
}