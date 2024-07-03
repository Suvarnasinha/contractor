// controllers/constructor.js

const con = require('../models/db');

exports.getUnselectedEstimates = async (req, res) => {
  const contractorid = req.userid; // Assuming contractorid is retrieved from JWT token

  try {
    const getEstimatesQuery = `
      SELECT c.contractorworkid, c.propertyid, c.estimate, c.time, c.accepted, p.name as property_name, u.name as owner_name
      FROM contractorwork c
      JOIN property p ON c.propertyid = p.propertyid
      JOIN users u ON p.userid = u.userid
      WHERE c.contactorid = ? AND c.selected = 0;
    `;
    const [estimates] = await con.execute(getEstimatesQuery, [contractorid]);
    res.json(estimates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitEstimate = async (req, res) => {
  const { propertyid, estimate, time } = req.body;
  const contractorid = req.userid; // Assuming contractorid is retrieved from JWT token

  try {
    const submitEstimateQuery = `
      INSERT INTO contractorwork (propertyid, estimate, time, contactorid) 
      VALUES (?, ?, ?, ?);
    `;
    await con.execute(submitEstimateQuery, [propertyid, estimate, time, contractorid]);
    res.json({ message: 'Estimate submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.selectEstimate = async (req, res) => {
  const { contractorworkid, accepted } = req.body;
  const contractorid = req.userid; // Assuming contractorid is retrieved from JWT token

  try {
    // Fetch propertyid from contractorworkid
    const getPropertyIdQuery = `
      SELECT propertyid FROM contractorwork WHERE contractorworkid = ? AND contactorid = ?;
    `;
    const [propertyResult] = await con.execute(getPropertyIdQuery, [contractorworkid, contractorid]);
    const propertyid = propertyResult[0].propertyid;

    // Update the accepted status for the selected estimate
    const updateEstimateQuery = `
      UPDATE contractorwork SET accepted = ?
      WHERE contractorworkid = ? AND propertyid = ? AND contactorid = ?;
    `;
    await con.execute(updateEstimateQuery, [accepted, contractorworkid, propertyid, contractorid]);

    res.json({ message: 'Estimate status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Submit proof of work
exports.submitProofOfWork = async (req, res) => {
  const { propertyid, description, images } = req.body;
  const contractorid = req.userid; // Assuming contractorid is retrieved from JWT token

  try {
    // Insert proof of work details
    const insertProofOfWorkQuery = `
      INSERT INTO proofwork (propertyid, description) 
      VALUES (?, ?);
    `;
    const [proofWorkResult] = await con.execute(insertProofOfWorkQuery, [propertyid, description]);

    // Insert images for proof of work
    if (images && images.length > 0) {
      const insertProofWorkImagesQuery = `
        INSERT INTO proofworkimage (proofworkid, image) 
        VALUES (?, ?);
      `;
      for (const image of images) {
        await con.execute(insertProofWorkImagesQuery, [proofWorkResult.insertId, image]);
      }
    }

    res.json({ message: 'Proof of work submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProofOfWorkWithComments = async (req, res) => {
  const contractorid = req.userid; // Assuming contractorid is retrieved from JWT token

  try {
    // Query to fetch proof of work with comments
    const getProofOfWorkQuery = `
      SELECT pw.proofworkid, pw.propertyid, pw.description, pw.status,
             pi.image, c.comment
      FROM proofwork pw
      LEFT JOIN proofworkimage pi ON pw.proofworkid = pi.proofworkid
      LEFT JOIN comment c ON pw.proofworkid = c.proofworkid
      WHERE pw.proofworkid IN (
        SELECT DISTINCT pwi.proofworkid
        FROM proofworkimage pwi
        JOIN workcontractor wc ON pwi.workid = wc.workid
        WHERE wc.contactorid = ?
      );






      SELECT pw.proofworkid, pw.propertyid, pw.description, pw.status,
       pi.image, c.comment
FROM proofwork pw
LEFT JOIN proofworkimage pi ON pw.proofworkid = pi.proofworkid
LEFT JOIN comment c ON pw.proofworkid = c.proofworkid
JOIN workcontractor wc ON pi.workid = wc.workid
WHERE wc.contactorid = ?

    `;
    const [proofOfWork] = await con.execute(getProofOfWorkQuery, [contractorid]);

    res.json(proofOfWork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};