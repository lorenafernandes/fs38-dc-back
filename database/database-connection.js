import { Sequelize } from "sequelize";

const databaseConnection = new Sequelize(
  "railway", 
  "root", 
  "MjsxPyUumypKghsJOKURqkVpoJsuFMni", 
  {
    host: "gondola.proxy.rlwy.net",
    port: 21740,
    dialect: "mysql",
    logging: false,
  }
);


const authenticate = async () => {
  try {
    await databaseConnection.authenticate();
    console.log("Database is connected!");
  } catch (error) {
    console.error(error);
  }
};

authenticate();

export default databaseConnection;
