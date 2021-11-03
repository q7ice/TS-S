async function errorMiddleware(ctx, next) {
  try {
    await next();
  } catch (error) {
    console.log(error);
    ctx.body = { error: error.message };
  }
}

module.exports = {
  errorMiddleware,
};
