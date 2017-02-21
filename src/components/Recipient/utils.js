const isValid = (detail) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(detail.split(' ').reverse().shift());
};

const getEmail = (detail) => {
  return isValid(detail)? detail.split(' ').reverse().shift() : '';
};

const getName = (detail) => {
  return detail.replace(getEmail(detail),'').trim();
};

export {
  isValid,
  getEmail,
  getName
};
