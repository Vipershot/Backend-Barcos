const handleHttpError = (res, message = "error", code = 404) => {
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError };
