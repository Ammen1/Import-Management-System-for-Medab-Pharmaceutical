const passport = require('passport');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "mail.gooderash.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: 'e-learning@gooderash.com',
    pass: 'Amen#19729',
  },
  debug: true, // Enable debugging
});

transporter.verify(function (error, success) {
  if (error) {
    console.log('SMTP Connection failed:', error);
  } else {
    console.log('SMTP Connection is successful');
  }
});

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt');
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};


exports.sendMail = async function ({ to, subject, text, html }) {
  try {
    let info = await transporter.sendMail({
      from: '"E-commerce" <e-learning@gooderash.com>',
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent:', info);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error; // Rethrow the error for further handling
  }
};

exports.invoiceTemplate = function(order){
  return (`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Receipt</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      border: 2
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #333;
      font-size: 24px;
    }
    .order-details {
      margin-bottom: 20px;
    }
    .order-details h2 {
      color: #555;
      font-size: 18px;
    }
    .order-summary {
      margin-top: 20px;
    }
    .order-summary table {
      width: 100%;
      border-collapse: collapse;
    }
    .order-summary th, .order-summary td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .order-summary th {
      background-color: #f2f2f2;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      color: #777;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank you for your order!</h1>
    </div>
    <div class="order-details">
      <h2>Order Details</h2>
      <p><strong>Order #:</strong> ${order.id}</p>
      <p><strong>Delivery Address:</strong> ${order.selectedAddress.name}, ${order.selectedAddress.street}, ${order.selectedAddress.city}, ${order.selectedAddress.state}, ${order.selectedAddress.pinCode}</p>
      <p><strong>Contact Number:</strong> ${order.selectedAddress.phone}</p>
    </div>
    <div class="order-summary">
      <h2>Order Summary</h2>
      <table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        ${order.items.map(item => `
          <tr>
            <td>${item.product.title}</td>
            <td>${item.quantity}</td>
            <td>$${Math.round(item.product.price * (1 - item.product.discountPercentage / 100), 2)}</td>
          </tr>
        `).join('')}
        <tr>
          <th colspan="2">Total</th>
          <td>$${order.totalAmount}</td>
        </tr>
      </table>
    </div>
    <div class="footer">
      <p>You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
      <p>To stop receiving these emails, you can <a href="https://sendgrid.com" target="_blank">unsubscribe</a> at any time.</p>
      <p>Ethiopia, State Oromia, city Jimma, Medab Pharmaceutical & Medical Equipment Import and Distributer Company</p>
    </div>
  </div>
</body>
</html>`
  );
}
