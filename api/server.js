const express = require("express");
const cors = require("cors");

const DevDeskRouter = require("../devdesk/dev-router");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/devdesk", DevDeskRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

module.exports = server;
