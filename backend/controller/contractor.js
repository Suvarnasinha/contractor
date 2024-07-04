// const con = require("../config/config");

// exports.showAllPropertyCont=async(req,res)=>{

// try {
//   const [rows] = await con.promise().query(`select p.propertyid,w.propertyid,p.name,p.address,pd.description,pri.image,u.userid from property
//   p join work w on p.propertyid=w.propertyid join workdeatil pd on w.workid=pd.workid join workimage pri on
//   pd.workdetailid=pri.workdetailid join users u on p.userid = u.userid where w.accept=0`);

//   res.json(rows);
// } catch (error) {
//   res.json({ error: error.message });
// }
// }

// exports.submitEstimate = async (req, res) => {
//   const { propertyid, estimate, time } = req.body;
//   const contractorid = req.userid;
//   try {
//     const submitEstimateQuery = `
//       INSERT INTO contractorwork (propertyid, estimate, time, contactorid) 
//       VALUES (?, ?, ?, ?);
//     `;
//     await con.execute(submitEstimateQuery, [propertyid, estimate, time, contractorid]);
//     res.json({ message: 'Estimate submitted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };










const con = require("../config/config");

exports.showAllPropertyCont = async (req, res) => {
  try {
    const [rows] = await con.promise().query(`
      SELECT p.propertyid, w.propertyid, p.name, p.address, pd.description, pri.image, u.userid 
      FROM property p 
      JOIN work w ON p.propertyid = w.propertyid 
      JOIN workdetail pd ON w.workid = pd.workid 
      JOIN workimage pri ON pd.workdetailid = pri.workdetailid 
      JOIN users u ON p.userid = u.userid 
      WHERE w.accept = 0
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitEstimate = async (req, res) => {
  const { propertyid, estimate, time } = req.body;
  const contractorid = req.userid;
  try {
    const submitEstimateQuery = `
      INSERT INTO contractorwork (propertyid, estimate, time, contractorid) 
      VALUES (?, ?, ?, ?);
    `;
    await con.execute(submitEstimateQuery, [propertyid, estimate, time, contractorid]);
    res.json({ message: 'Estimate submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






exports.submitProofOfWork = async (req, res) => {
  const { propertyid, description } = req.body;
  const images = req.files.map(file => file.path);

  try {
    // Insert proof of work details into database
    const insertProofQuery = `
      INSERT INTO proofwork (propertyid, description) 
      VALUES (?, ?);
    `;
    const [insertResult] = await con.promise().query(insertProofQuery, [propertyid, description]);
    const proofworkid = insertResult.insertId;

    // Insert proof of work images into database
    const insertImagesQuery = `
      INSERT INTO proofworkimage (proofworkid, image) 
      VALUES (?, ?);
    `;
    for (let image of images) {
      await con.promise().query(insertImagesQuery, [proofworkid, image]);
    }

    res.json({ message: 'Proof of work submitted successfully' });
  } catch (error) {
    console.error('Error submitting proof of work:', error);
    res.status(500).json({ error: error.message });
  }
};