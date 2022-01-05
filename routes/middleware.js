const ensureAuthenticated = (req, res, next) => {
	// if (req.cookies.user_id) {
	// 	return next();
	// }
	// return res.status(401).json({
	// 	errors: [
	// 		{
	// 			msg: "Not authorized",
	// 			status: "401",
	// 		},
	// 	],
	// });
	return next();
};

module.exports = ensureAuthenticated;
