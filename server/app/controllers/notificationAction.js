const tables = require("../../database/tables");

const newNotification = async (req, res, next) => {
  const reservations = req.body;
  const reservationId = req.reservation_id;
  const { type } = req.query;

  try {
    const notification = await tables.notification.create(
      reservations,
      reservationId,
      type
    );
    if (notification !== undefined || notification !== null) {
      res.status(201);
    }
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const userId = req.user;
    const notification = await tables.notification.read(userId);
    res.status(200).json(notification);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { notification } = req.body;
  try {
    const response = await tables.notification.delete(notification);
    if (response !== undefined || response !== null) {
      res.status(204).json();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { newNotification, read, destroy };
