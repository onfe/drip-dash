require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "dev-db.sqlite3"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: true
    }
  }
};
