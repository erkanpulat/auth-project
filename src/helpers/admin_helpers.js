const moment = require("moment");

// date format
const generateDate = (date, format) => {
  return moment(date).locale("tr").format(format);
};

// return badge div
const activeStatusTurn = (status) => {
  return status == 1
    ? `<div class="badge bg-success text-white rounded-pill">Onaylı E-posta</div>`
    : status == 0
    ? `<div class="badge bg-primary text-white rounded-pill">Onaylanmamış E-posta</div>`
    : `<div class="badge bg-secondary text-white rounded-pill">Bilgi Bulunamadı</div>`;
};

module.exports = {
  generateDate,
  activeStatusTurn,
};
