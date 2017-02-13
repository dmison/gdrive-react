const isValid = (detail) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(detail.split(' ').reverse().shift());
};

const getEmail = (detail) => {
  return isValid(detail)? detail.split(' ').reverse().shift() : '';
};

export {
  isValid,
  getEmail
};
