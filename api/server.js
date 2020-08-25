const express = require("express");
const cors = require("cors");

const DevDeskRouter = require("../devdesk/dev-router");
const AuthRouter = require("../auth/auth-router.js");
const TokenRouter = require("../auth/token-router.js");
const protected = require("../auth/restricted-mw.js");

const server = express();

server.use(cors());
server.use(express.json());

// This contains only unprotected GET requests for student questions and answers
server.use("/api/devdesk", DevDeskRouter);

// This contains the GET for registration and login + authorization
server.use("/api/devdesk/auth", AuthRouter);

// This contains the GET/POST/DELETE requests that are locked behind authorization and will require the token from login
server.use("/api/devdesk/protected", protected, TokenRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;
