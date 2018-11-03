exports.appError = function (message, code, data = {}) {
	let e = new Error();
	e.linkCustomError = true;
	e.message = message;
	e.httpErrorCode = code;
	e.data = data;
	return e;
};