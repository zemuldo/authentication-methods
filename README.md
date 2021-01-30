# zemuldo-authentication-methods

To start, clone repo then:
 Run `npm install`
 Run `npm start`

## Basic Auth
Call endpoint with credentials.
Example:
```shell
curl --request GET \
  --url http://localhost:4000/basic \
  --header 'Authorization: Basic emVtdWxkbzpwYXNzd29yZA=='
```

## Bearer Token

Run auth request
```shell
curl --request POST \
  --url http://localhost:4000/bearer-token/rsa-sha-256/signin \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "zemuldo",
	"password": "password"
}'
```

Response to this will look like

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2V..."
}
```

Use the token to call a protected endpoint

```shell
curl --request GET \
  --url http://localhost:4000/bearer-token/rsa-sha-256/protected \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1...'
```