const resetFilter = (req, res, next) => {
  req.body.filterString = '';
  next();
};

exports.resetFilter = resetFilter;
