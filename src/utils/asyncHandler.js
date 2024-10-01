/**
 * A higher-order function that wraps asynchronous middleware functions
 * in Express to handle errors gracefully.
 *
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Function} A middleware function that handles the request, response, and next function.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

// export default asyncHandler;
