# DevTinder APIs List

## Auth Router
- POST /sign-up
- POST /login
- POST /forgot-password
- POST /reset-password/:token
- POST /logout

## Profile Router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## Connection Router
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## User Router
- GET /user/connections
- GET /user/requests/received
- GET /user/feed
