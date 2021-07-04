const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://${process.env.HOST}/${process.env.DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((_) => {
    console.log(`Connection to database(${process.env.DB_NAME}) successful.`);
  })
  .catch((err) => {
    console.log(
      `Connection to database(${process.env.DB_NAME}) failed. Error: `,
      err
    );
  });
