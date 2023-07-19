const bcrypt = require("bcrypt");
const saltRounds = 10;

const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class User extends Model {
  //   async correctPassword(pwAttempt) {
  //     console.log("password Attemp", pwAttempt);
  //     console.log("Correct password", this.password);
  //     console.log(await bcrypt.compare(pwAttempt, this.password));
  //     return await bcrypt.compare(pwAttempt, this.password);
  //   }
  // }

  
  // async function hashPassword(user) {
  //   console.log(user.email);
  //   if (user.changed("password")) {
  //     user.password = await bcrypt.hash(user.password, saltRounds);
  //     console.log("password", user.password);
  //   }
  // }

  // static async generateSalt(saltRounds) {
  //   return await bcrypt.genSalt(saltRounds);
  // }

  static async encryptPassword(password) {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(this);
  }

  async correctPassword(pwAttempt) {
    console.log("password Attemp", pwAttempt);
    console.log("Correct password", this.password);
    return await bcrypt.compare(pwAttempt, this.password);
  }
}
User.init(
  {
    //add the table
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://i.stack.imgur.com/l60Hf.png",
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
    },
    gitHubId: {
      type: DataTypes.STRING,
    },
    userType: {
      type: DataTypes.ENUM("student", "TA", "admin"),

      defaultValue: "student",
    },
    cohort_year: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    hooks: {
      //   // beforeCreate: encryptPassword,
      //   // beforeSave: encryptPassword,
      //   // beforeUpdate: encryptPassword,
      //   // beforeBulkCreate: async (users) => {
      //   //   for (let i = 0; i < users.length; i++) {
      //   //     await encryptPassword(users[i]);
      //   //   }
      //   // },
      //   // beforeCreate: async (user) => {
      //   //   if (user.changed("password")) {
      //   //     const salt = await User.generateSalt(saltRounds);
      //   //     console.log("Salt", salt);
      //   //     user.password = await User.encryptPassword(user.password, salt);
      //   //     user.salt = salt;
      //   //   }
      //   // },
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
      beforeBulkCreate: async (users) => {
        // await users.forEach(async (user) => {
        //   if (user.changed("password")) {
        //     user.password = await bcrypt.hash(user.password, saltRounds);
        //   }
        // });
        for (let i = 0; i < users.length; i++) {
          if (users[i].changed("password")) {
            users[i].password = await bcrypt.hash(
              users[i].password,
              saltRounds
            );
          }
        }
      },
    },
  }
);
// User.beforeCreate(hashPassword)
module.exports = User;
