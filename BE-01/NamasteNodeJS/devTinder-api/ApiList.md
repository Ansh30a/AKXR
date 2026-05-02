# DevTinder APIs List

## Auth Router
- POST /signup
- POST /login
- POST /logout

## Profile Router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## Connection Router
- POST /request/send/:status/:userId

- POST /request/review/:status/:requestId

## User Router
- GET /user/connections
- GET /user/requests/received
- GET /user/feed