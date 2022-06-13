require('dotenv').config();

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const { Sequelize, DataTypes } = require('sequelize');

// Create connection to postgres
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

// Define device table
const Device = sequelize.define(
  'device',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// Define coordinate table
const Coordinate = sequelize.define(
  'coordinate',
  {
    latitude: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Coordinate.belongsTo(Device);

// Define trip table
const Trip = sequelize.define(
  'trip',
  {
    name: {
      type: DataTypes.STRING,
    },
    start: {
      type: DataTypes.TIME,
    },
    end: {
      type: DataTypes.TIME,
    },
  },
  {
    freezeTableName: true,
  }
);

Trip.belongsTo(Device);

const resetDB = () => {
  sequelize.sync({ force: true });
}
exports.resetDB = resetDB;