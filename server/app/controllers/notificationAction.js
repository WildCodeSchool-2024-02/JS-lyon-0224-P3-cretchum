const tables = require("../../database/tables");

const newNotification = async (req, res, next) => {
  const reservations = req.body;
  const reservationId = req.reservation_id;
  const { type } = req;
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

module.exports = newNotification;
