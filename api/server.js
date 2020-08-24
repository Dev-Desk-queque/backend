const express = require("express");

const DevDeskRouter = require("../devdesk/dev-router");

const server = express();

server.use(express.json());
server.use("/api/devdesk", DevDeskRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;
