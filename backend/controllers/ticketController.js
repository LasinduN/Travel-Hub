const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const axios = require("axios");
const sendEmail = require("../util/sendEmail");

const addTicket = asyncHandler(async (req, res) => {
  const id = req.person._id;
  const name = req.person.shortName;
  const email = req.person.email;

  const { station, total, seatCount, roadRouteId, startLocation} = req.body;

  //get the last ticketId
  const lastTicket = await Ticket.find().sort({ ticketId: -1 }).limit(1);

  let ticketId = "";

  if (lastTicket.length === 0) {
    ticketId = "TK#kts1";
  } else {
    const lastTicketId = lastTicket[0].ticketId;
    const lastTicketIdNumber = parseInt(lastTicketId.split("TK#kts")[1]);
    ticketId = `TK#kts${lastTicketIdNumber + 1}`;
  }

  const config = {
    headers: { Authorization: "Bearer 4ed0f760-8bd4-11ef-872f-0d0b4abc9854" },
  };

  const bodyParameters = {
    colorDark: "#000",
    qrCategory: "url",
    text: `
    ticketId -: ${ticketId}
    station -: ${station}
    total -: ${total}
    seatCount -: ${seatCount}
    startLocation -: ${startLocation}
    roadRouteId -: ${roadRouteId}
    `,
  };

  let qrCode = "";
  try {
    const qrRes = await axios.post(
      "https://qrtiger.com/api/qr/static",
      bodyParameters,
      config
    );
    qrCode = qrRes.data.url;
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }

  const ticket = new Ticket({
    ticketId,
    userId: id,
    date: Date.now(),
    station,
    total,
    seatCount,
    roadRouteId,
    qrCode,
  });

  try {
    const createdTicket = await ticket.save();

    //
    // Improved email message formatting with station and ticket price
    const message = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
  <h2 style="color: #333;">Hello ${name},</h2>
  <p style="color: #555;">Thank you for purchasing a ticket from <strong>Travel Hub</strong>.</p>
  <p style="color: #555;">Your ticket details are as follows:</p>
  <ul style="color: #555;">
    <li><strong>Station:</strong> ${station}</li>
    <li><strong>Ticket Price:</strong> ${total}</li>
    <li><strong>Seat Count:</strong> ${seatCount}</li>
  </ul>
  <p style="color: #555;">Please note that your ticket is only valid for <strong>2 days</strong>.</p>
  <img src="${qrCode}" alt="QR Code" style="width: 200px; height: 200px; border: 1px solid #e0e0e0; border-radius: 4px;" />
  <p style="margin-top: 30px; color: #555;">Best Regards,<br />Travel Hub</p>
</div>
`;

    const subject = "Ticket Purchase";
    const sent_to = email;
    const sent_from = process.env.EMAIL_USER;

    try {
      await sendEmail(subject, message, sent_to, sent_from);
    } catch (err) {
      res.status(500);
      throw new Error("Email didn't not sent,Please try again");
    }

    ///
    res.status(201).json(createdTicket);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getAllTickets = asyncHandler(async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.json(tickets);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

module.exports = { addTicket, getAllTickets };
