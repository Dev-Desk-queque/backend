const express = require("express");
const cors = require("cors");

const DevDeskRouter = require("../devdesk/dev-router");
const authRouter = require("../auth/auth-router.js");
const protected = require("../auth/restricted-mw.js");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api/devdesk", DevDeskRouter);
server.use("/api/devdesk/auth", authRouter);
server.use("/api/devdesk/protected", protected, authRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;
