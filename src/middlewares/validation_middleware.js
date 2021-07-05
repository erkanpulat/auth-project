const { body } = require("express-validator");

// register - validate user
const validateNewUser = () => {
  return [
    body("firstName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("İsim en az 2 karakter olmalıdır.")
      .isLength({ max: 30 })
      .withMessage("İsim en fazla 30 karakter olmalıdır."),

    body("lastName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Soyad en az 2 karakter olmalıdır.")
      .isLength({ max: 30 })
      .withMessage("Soyad en fazla 30 karakter olmalıdır."),

    body("email").trim().isEmail().withMessage("Geçerli bir mail giriniz."),

    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Şifreniz en az 6 karakter olmalıdır.")
      .isLength({ max: 20 })
      .withMessage("Şifreniz en fazla 20 karakter olmalıdır."),

    body("rePassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Şifreler aynı değil!");
        }
        return true;
      }),
  ];
};

module.exports = {
  validateNewUser,
};