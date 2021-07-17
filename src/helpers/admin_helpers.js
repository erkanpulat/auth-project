const moment = require("moment");

const generateDate = (date, format) => {
  return moment(date).locale("tr").format(format);
};

const activeStatusTurn = (status) => {
  return status == 1
    ? "Onaylı E-posta"
    : status == 0
    ? "Onaylanmamış E-posta"
    : "Bilgi Bulunamadı";
};

module.exports = {
  generateDate,
  activeStatusTurn,
};
