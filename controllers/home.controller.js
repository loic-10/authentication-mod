export const home = async (req, res, next) => {
  try {
    res.render("index");
  } catch (e) {
    next(e);
  }
};
