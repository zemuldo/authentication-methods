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
