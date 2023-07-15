const crypto = require("crypto");

const { Model, DataTypes } = require("sequelize");
const db = require("../db");
const DEFAULTVALUE = " ";

class User extends Model {
  static async generateSalt() {
    return crypto.randomBytes(16).toString("base64");
  }

  static async encryptPassword(pw, salt) {
    return crypto
      .createHash("RSA_SHA256")
      .update(pw)
      .update(salt)
      .dygest("hex");
  }

  async correctPassword(pwAttempt) {
    return User.enryptPassword(pwAttempt, this.salt) === this.password;
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
      unique: true,
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
    hook: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.salt = await User.generateSalt();
          user.password = await User.encryptPassword(user.password, user.salt);
        }
      },
      beforeBulkCreate: async (users) => {
        users.forEach(async (user) => {
          if (user.changed("password")) {
            user.salt = await User.generateSalt();
            user.password = await User.encryptPassword(
              user.password,
              user.salt
            );
          }
        });
      },
    },
  }
);

module.exports = User;
