// MY_VAR is available in all Jest tests and suites, no need to adapt the before() or beforeAll() functions
process.env.JWTSECRET =
	"aabef26f1a6337827e3242b2c5cf3fa92792fbfaab846ac5efe16f6e22e7e10a"; // Not the actual jwt secret

module.exports = {
	testEnvironment: "node",
};
