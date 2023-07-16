const bcrypt = require("bcrypt");
const saltRounds = 10;



const { Model, DataTypes } = require("sequelize");
const db = require("../db");


class User extends Model {
  static async generateSalt() {
    return crypto.randomBytes(16).toString("base64");
  }

  correctPassword(pwAttempt) {
    return bcrypt.compare(pwAttempt, this.password)
  }
}
 async function hashPassword(user) {
  console.log(user.email);
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
    console.log("password", user.password);
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
    hooks: {
      beforeCreate: hashPassword,
      beforeSave: hashPassword,
      beforeUpdate: hashPassword,
      beforeBulkCreate: async (users) => {
       for( let i = 0; i< users.length; i++){
          await hashPassword(users[i])
       }
      
      },
    },
  }
);
// User.beforeCreate(hashPassword)
module.exports = User;
