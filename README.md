ENDPOINTS

These contain only the GET requests for student questions and their answers

/api/devdesk
GET - /questions
GET - /answer
GET - /question/:id
GET - /question/:id/answer

These contain the requests for registration of a new account and login + token return

/api/devdesk/auth
POST - /register
POST - /login

These contain the GET/POST/PUT/DELETE requests which are locked behind authorization and will require a token in the header from login

/api/devdesk/protected
GET - /users
GET - /user/:id
POST - /questions
POST - /question/:id/answer
PUT - /question/:id
PUT - /question/:id/answer
DELETE - /question/:id
DELETE - /question/:id/answer
