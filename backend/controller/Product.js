const { Product } = require('../model/Product');

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  product.discountPrice = Math.round(product.price*(1-product.discountPercentage/100))
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }

  let query = Product.find(condition).populate({ path: 'user', select: 'email' });

  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(',') } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(',') },
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(',') } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(',') },
    });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
    product.discountPrice = Math.round(product.price*(1-product.discountPercentage/100))
    const updatedProduct = await product.save()
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.generateProductReports = async (req, res) => {
  try {
    const { customerName, medicineName, quantity, totalPrice, paymentMethod, description } = req.body;

    // Create a new PDF document
    const doc = new PDFDocument();
    const pdfPath = './medicine_order_report.pdf'; 

    // Generate report content
    doc.fontSize(14).text('Medicine Order Report', { align: 'center' }).moveDown();
    doc.fontSize(12)
        .text(`Customer Name: ${customerName}`)
        .text(`Medicine Name: ${medicineName}`)
        .text(`Quantity: ${quantity}`)
        .text(`Total Price: ${totalPrice}`)
        .text(`Payment Method: ${paymentMethod}`)
        .text(`description: ${description}`)
        .moveDown();

    // Finalize the PDF and save to a file
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);
    doc.end();

    writeStream.on('finish', async () => {
      // Save the PDF file to Report schema
      const pdfData = fs.readFileSync(pdfPath);
      const report = new ManagerInput({
        customerName,
        medicineName,
        quantity,
        totalPrice,
        paymentMethod,
        description,
      });
      await report.save();

      // Send the PDF report to the constructor via email
      await sendReportByEmail(pdfPath, 'jhilwa5@gmail.com'); 

      // Send the PDF file as a response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="project_report.pdf"');
      fs.createReadStream(pdfPath).pipe(res);
    });
  } catch (error) {
    console.error("Error generating project report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendReportByEmail = async (pdfPath, constructorEmail) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "mail.gooderash.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: 'e-learning@gooderash.com',
        pass: 'Amen#19729',
      },
    });

    // Setup email data
    const mailOptions = {
      from:  'e-learning@gooderash.com',
      to: constructorEmail,
      subject: 'Project Report',
      text: 'Please find the attached project report.',
      attachments: [{
        filename: 'project_report.pdf',
        path: pdfPath, 
      }],
    };
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Report sent to constructor successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

