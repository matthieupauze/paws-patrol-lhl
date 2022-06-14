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
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
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
      type: DataTypes.DATE,
    },
    end: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);
Trip.belongsTo(Device);

const resetDB = () => {
  return sequelize.sync({ force: true })
};
exports.resetDB = resetDB;

const addCoordinates = (imei: number, lat: number, long: number, time: any) => {
  Device.create({
    id: imei,
  }).catch((err: any) => console.log(err));
  Coordinate.create({
    deviceId: imei,
    latitude: lat,
    longitude: long,
    time: time,
  }).catch((err: any) => console.log(err));
};
exports.addCoordinates = addCoordinates;

const getCoordinate = (imei: number) => {
  return Coordinate.findOne({
    order: [['time', 'DESC']],
    where: { deviceId: imei },
  });
};
exports.getCoordinate = getCoordinate;
