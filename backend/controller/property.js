// controllers/property.js

const con = require('../models/db');

exports.addProperty = async (req, res) => {
  const { name, address, description } = req.body;
  const userid = req.userid; // Assume userid is retrieved from JWT token

  try {
    const addPropertyQuery = `INSERT INTO property (name, address, description, userid) VALUES (?, ?, ?, ?)`;
    const result = await con.execute(addPropertyQuery, [name, address, description, userid]);

    const propertyId = result[0].insertId;
    res.json({ message: 'Property added successfully', propertyId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addWork = async (req, res) => {
  const propertyId = req.params.propertyid;
  const { description } = req.body;
  const images = req.files; // Assuming multer is used for file uploads

  try {
    const addWorkQuery = `INSERT INTO work (propertyid, complete) VALUES (?, ?)`;
    const [workResult] = await con.execute(addWorkQuery, [propertyId, 0]);

    const workId = workResult.insertId;

    const addWorkDetailQuery = `INSERT INTO workdeatil (workid, description) VALUES (?, ?)`;
    const [workDetailResult] = await con.execute(addWorkDetailQuery, [workId, description]);

    const workDetailId = workDetailResult.insertId;

    const addWorkImagesQuery = `INSERT INTO workimage (workdetailid, image) VALUES (?, ?)`;
    for (let file of images) {
      await con.execute(addWorkImagesQuery, [workDetailId, file.path]);
    }

    res.json({ message: 'Work added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





exports.getEstimates = async (req, res) => {
  const propertyOwnerid = req.userid; // Assuming propertyOwnerid is retrieved from JWT token

  try {
    const getEstimatesQuery = `
      SELECT cw.contractorworkid, cw.propertyid, cw.estimate, cw.time, cw.accepted, u.name as contractor_name
      FROM contractorwork cw
      JOIN users u ON cw.contactorid = u.userid
      WHERE cw.propertyid IN (
        SELECT propertyid FROM property WHERE userid = ?
      );
    `;
    const [estimates] = await con.execute(getEstimatesQuery, [propertyOwnerid]);

    res.json(estimates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.selectEstimate = async (req, res) => {
  const { contractorworkid, accepted } = req.body;
  const propertyOwnerid = req.userid; // Assuming propertyOwnerid is retrieved from JWT token

  try {
    // Fetch propertyid from contractorworkid
    const getPropertyIdQuery = `
      SELECT propertyid FROM contractorwork WHERE contractorworkid = ?;
    `;
    const [propertyResult] = await con.execute(getPropertyIdQuery, [contractorworkid]);
    const propertyid = propertyResult[0].propertyid;

    // Update the accepted status for the selected estimate
    const updateEstimateQuery = `
      UPDATE contractorwork SET accepted = ?
      WHERE contractorworkid = ? AND propertyid = ?;
    `;
    await con.execute(updateEstimateQuery, [accepted, contractorworkid, propertyid]);

    res.json({ message: 'Estimate status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};