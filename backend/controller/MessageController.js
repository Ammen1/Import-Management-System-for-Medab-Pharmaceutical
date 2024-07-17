const { ContactSuppliers } = require('../model/ContactSuppliers');


exports.getAllMessages = async (req, res) => {
  try {
    const allMessages = await ContactSuppliers.find().populate('userId');
    console.log(allMessages);
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500).json(error);
  }
}


exports.getMessages = async (req, res) => {
  const { userId } = req.params;
  try {
    let query;
    if (userId === 'all') {
      query = {}; // No filter when userId is 'all'
    } else {
      query = { userId }; // Filter messages by userId
    }
    const result = await ContactSuppliers.find(query).populate('userId');
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
