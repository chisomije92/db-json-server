/** @format */

// See https://github.com/typicode/json-server#module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");

server.options("*", cors());

server.use(
	cors({
		origin: true,
		credentials: true,
		preflightContinue: false,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	})
);

server.use(middlewares);
server.use(cors());
// Add this before server.use(router)
server.use(
	jsonServer.rewriter({
		"/api/*": "/$1",
		"/blog/:resource/:id/show": "/:resource/:id",
	})
);
server.use(router);
server.listen(5000, () => {
	console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
