exports.validateRating = (rating) => {
  const numRating = Number(rating);
  return !isNaN(numRating) && numRating >= 1 && numRating <= 5;
};

exports.validateId = (id) => {
  return typeof id === 'string' && id.length > 0;
};