const errorModdleware = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.REACT_ENV === "production  " ? null : err.stack,
  });
};

module.exports = {
  errorModdleware,
};
