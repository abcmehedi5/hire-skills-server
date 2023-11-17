/**
 *
 * This middleware validate the payload
 * Two parameter receives Schema and validation stack
 * Stack means which types of payload is it, body or query
 * @param Schema
 * @param stack
 * @returns
 */
const JoiValidator = (Schema, Stack = "body") => {
  return (req, res, next) => {
    try{
      if (Schema.validate(req[Stack])) {
        const validatePayload = Schema.validate(req[Stack]);
        if (validatePayload.error) {
          return res.status(422).json({
            message: validatePayload.error.message,
          });
        }
      }
      next();
    }catch(e){
      return res.status(500).json(e)
    }
  };
};
module.exports = JoiValidator;
