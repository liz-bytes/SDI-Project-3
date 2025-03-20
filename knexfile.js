require("dotenv").config();
module.exports = {
	development: {
    client: 'postgresql',
    connection: {
      host: "127.0.0.1",
			password: "password",
			user: "username",
			port: 4000,
			database: "job_search",
    }
  },
};
