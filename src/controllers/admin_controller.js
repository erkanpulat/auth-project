const User = require("../models/User");

// user home page
const getHomePage = async (req, res, next) => {
  try {
    // total number of users
    const totalNumOfUsers = await User.countDocuments({ isAdmin: false });

    // number of users this month
    const thisMthNumOfUsers = await User.countDocuments({
      isAdmin: false,
      createdAt: {
        $gt: new Date(
          // this month / 01 / this year 00:00:00
          `${new Date().getMonth() + 1}/01/${new Date().getFullYear()}`
        ),
      },
    });

    // Number of email verified users
    const emailVerNumOfUsers = await User.countDocuments({
      isAdmin: false,
      emailActive: true,
    });

    // total number of admin
    const totalNumOfAdmins = await User.countDocuments({
      isAdmin: true,
    });

    res.render("pages/admin/home_page", {
      layout: "admin/home_layout",
      totalNumOfUsers,
      thisMthNumOfUsers,
      emailVerNumOfUsers,
      emailVerPercUsers: parseInt(
        (emailVerNumOfUsers / totalNumOfUsers) * 100,
        10
      ),
      totalNumOfAdmins,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getHomePage,
};
