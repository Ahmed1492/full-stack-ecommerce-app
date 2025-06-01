

import sequelize from "../src/db/connection.js";
async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log("DB connected ✅");

    await sequelize.sync({ force: true }); // use `force: false` to avoid dropping existing tables
    console.log("Models synced & tables created ✅");
  } catch (err) {
    console.error("Failed to sync models ❌", err);
  } finally {
    await sequelize.close();
  }
}

syncModels();