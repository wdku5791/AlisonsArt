module.exports = (res, obj) => {
  let result = {};
  result = Object.assign({}, obj);
  if (res.body) {
    result.user = {
      username: res.body.username,
      userId: res.body.userId
    };
  }
  return result;
};