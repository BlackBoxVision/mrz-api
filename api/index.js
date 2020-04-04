const MrzService = require('../commons/services');

module.exports = async (req, res) => {
  try {
    // TODO: add validation with Joi
    const fields = await MrzService.decodeFromImage({
      dataURI: req.body.image,
    });

    res.status(200);
    res.json({
      meta: {
        method: req.method,
        path: req.url,
        status: 200,
      },
      data: [fields],
      errors: [],
    });
  } catch (err) {
    res.status(err.status);
    res.json({
      meta: {
        method: req.method,
        path: req.url,
        status: err.status,
      },
      data: [],
      errors: [{ code: err.name, details: err.message, pointers: [] }],
    });
  }
};
