require('dotenv').config();

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const { Sequelize, DataTypes, Op } = require('sequelize');

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
    microchip: {
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

// Define perimeter table
const Perimeter = sequelize.define(
  'perimeter',
  {
    left: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    right: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);
Perimeter.belongsTo(Device);

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

// Reset functions

const resetDB = () => {
  return sequelize.sync({ force: true });
};
exports.resetDB = resetDB;

// Coordinate functions

const addCoordinate = (imei: number, lat: number, long: number, time: Date) => {
  return Coordinate.create({
    deviceId: imei,
    latitude: lat,
    longitude: long,
    time: time,
  });
};
exports.addCoordinate = addCoordinate;

const getCoordinate = (imei: number) => {
  return Coordinate.findOne({
    order: [['time', 'DESC']],
    where: { deviceId: imei },
  });
};
exports.getCoordinate = getCoordinate;

// Device functions

const addDevice = (imei: number, name: string = '') => {
  return Device.create({
    id: imei,
    name: name,
  });
};
exports.addDevice = addDevice;

const getDevice = (imei: number) => {
  return Device.findByPk(imei);
};
exports.getDevice = getDevice;

const updateDevice = (imei: number, name: string, microchip: string) => {
  return getDevice(imei).then((data: any) => {
    if (!data) {
      console.log('no data');
      return;
    }
    return data.update({
      name: name,
      microchip: microchip,
    });
  });
};
exports.updateDevice = updateDevice;

const getDevices = () => {
  return Device.findAll();
};
exports.getDevices = getDevices;

// Trip functions

const addTrip = (imei: number, start: Date, name: string = '') => {
  return Trip.create({
    deviceId: imei,
    name: name,
    start: start,
    end: start,
  });
};
exports.addTrip = addTrip;

const getTripsByIMEI = (imei: number) => {
  return Trip.findAll({
    where: {
      deviceId: imei,
    },
  });
};
exports.getTripsByIMEI = getTripsByIMEI;

const updateTrip = (id: number, end: Date) => {
  return Trip.findByPk(id).then((data: any) => {
    return data.update({ end: end });
  });
};
exports.updateTrip = updateTrip;

const getTrips = () => {
  return Trip.findAll();
};
exports.getTrips = getTrips;

const getCoordinatesForTrip = (id: number, imei: number) => {
  return Trip.findByPk(id).then((data: any) => {
    return Coordinate.findAll({
      where: {
        deviceId: imei,
        time: {
          [Op.between]: [data.start, data.end],
        },
      },
    });
  });
};
exports.getCoordinatesForTrip = getCoordinatesForTrip;

// Perimeter functions

const addPerimeter = (imei: number, left: number, right: number) => {
  return Perimeter.create({
    deviceId: imei,
    left: left,
    right: right,
  });
};
exports.addPerimeter = addPerimeter;

const getPerimeterByIMEI = () => {
  return;
};
exports.getPerimeterByIMEI = getPerimeterByIMEI;

const updatePerimeter = () => {
  return;
};
exports.updatePerimeter = updatePerimeter;

const getPerimeters = () => {
  return Perimeter.findAll();
};
exports.getPerimeters = getPerimeters;