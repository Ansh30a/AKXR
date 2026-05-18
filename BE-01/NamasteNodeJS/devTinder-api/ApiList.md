# DevTinder APIs List

## Auth Router
- POST /sign-up
- POST /login
- POST /logout

## Profile Router
- GET /profile
- PATCH /profile/edit

## Connection Router
- POST /request/send/:status/:toUserId

- POST /request/review/:status/:requestId

## User Router
- GET /user/connections
- GET /user/requests/received
- GET /user/feed
