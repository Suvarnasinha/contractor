const con = require("../config/config");

exports.showAllPropertyCont = async (req, res) => {
  try {
    const userid =req.userid;
    console.log(userid)
    const [rows] = await con.promise().query(`
    SELECT 
    p.propertyid,
    p.name AS property_name,
    p.address AS property_address,
    p.description AS property_description,
    u.userid AS userid
FROM 
    property p
JOIN 
    work w ON p.propertyid = w.propertyid
JOIN 
    workdeatil pd ON w.workid = pd.workid
JOIN 
    workimage pri ON pd.workdetailid = pri.workdetailid
JOIN 
    users u ON p.userid = u.userid
WHERE 
    w.accept = 0
GROUP BY 
    p.propertyid, p.name, p.address, p.description, u.userid


    `,);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitEstimate = async (req, res) => {
  const { propertyid, estimate, time } = req.body;
  console.log("daraaaasasasasasasa",req.body);
  const contractorid = req.userid;
  try {
    const submitEstimateQuery = `
      INSERT INTO contractorwork (propertyid, estimate, time, contactorid) 
      VALUES (?, ?, ?, ?);
    `;
    await con.execute(submitEstimateQuery, [propertyid, estimate, time, contractorid]);
    res.json({ propertyid, estimate, time,contractorid});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.proofData=async (req,res)=>{
  const userid =req.userid;
  try {
    const [proofData] = await con.promise().query(
      `SELECT DISTINCT p.propertyid, p.name AS property_name, p.address AS property_address, p.description AS property_description
      FROM property p
      INNER JOIN work w ON p.propertyid = w.propertyid
      INNER JOIN workcontractor wc ON p.propertyid = wc.propertyid
      WHERE wc.contactorid =?  AND w.accept = 1`,
      [userid]);
      res.json(proofData);
  } catch (error) {
    console.log(error);
  }
}



exports.addProof = async (req, res) => {
  const { propertyid } = req.body;
  const descriptions = req.body.descriptions;
  const contractorid = req.userid; // Assuming this comes from the authentication middleware
  const files = req.files;
  const proofDetails = [];
  console.log("propertid",propertyid);
  console.log("descriptionsd",descriptions);
  console.log("files",files);

  try {
    // Insert proof data into proofwork table
    for (let i = 0; i < descriptions.length; i++) {
      const description = descriptions[i];
      const insertProofQuery = 'INSERT INTO proofwork (propertyid, description) VALUES (?, ?)';
      const [proofResult] = await con.promise().query(insertProofQuery, [propertyid, description]);
      const proofworkid = proofResult.insertId;

      proofDetails.push({ proofworkid, description });

      console.log(`Inserted proof data with proofworkid: ${proofworkid}`);

      // Insert each image into proofworkimage table
      const insertImageQuery = 'INSERT INTO proofworkimage (proofdataid, image) VALUES (?, ?)';
      files.forEach((file) => {
        if (file.fieldname === `images`) {
          con.promise().query(insertImageQuery, [proofworkid, file.path]);
          console.log(`Inserted image with path: ${file.path} for proofworkid: ${proofworkid}`);
        }
      });
    }

    res.status(200).json({ message: 'Proof data and images added successfully', proofDetails });
  } catch (error) {
    console.error('Error adding proof data:', error);
    res.status(500).json({ error: 'Failed to add proof data' });
  }
};



exports.addComment = async (req, res) => {
  const { proofworkid, comment } = req.body;
  const userid = req.userid;

  try {
    const addCommentQuery = `INSERT INTO comment (proofworkid, comment) VALUES (?, ?)`;
    await con.promise().query(addCommentQuery, [proofworkid, comment]);

    res.json({ message: 'Comment added successfully' });
  } catch (error) {
    console.log('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};




exports.getComments = async (req, res) => {
  const { proofworkid } = req.params;

  try {
    const [comments] = await con.promise().query(
      `SELECT c.comment, c.commentid 
       FROM comment c 
       WHERE c.proofworkid = ?`,
      [proofworkid]
    );
    res.json(comments);
  } catch (error) {
    console.log('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};



exports.getCommentProperties=async(req,res)=>{
  const userid = req.userid;
  try {
    const [properties] = await con.promise().query(`
     SELECT DISTINCT 
    p.propertyid, 
    p.name AS property_name, 
    p.address AS property_address, 
    pw.propertyid AS propertiesid, 
    p.description AS property_description
FROM 
    property p
INNER JOIN 
    proofwork pw ON p.propertyid = pw.propertyid
INNER JOIN 
    comment c ON pw.proofworkid = c.proofworkid
INNER JOIN 
    workcontractor wc ON p.propertyid = wc.propertyid
WHERE 
    wc.contactorid = 2
ORDER BY 
    p.propertyid;
    `,  [userid]);

    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Error fetching properties' });
  }
}