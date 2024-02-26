import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    limit: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
})

export default limiter