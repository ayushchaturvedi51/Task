import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP/user to 100 requests per windowMs
  keyGenerator: function (req) {
    return req["user"].userId; // use user ID as the key
  },
  handler: function (req, res, next) {
    res.status(429).json({
      message: "Too many requests, please try again later.",
    });
  },
});


export default limiter