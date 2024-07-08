const con = require("../config/config");

exports.addProperty = async (req, res) => {
  const { name, address, description } = req.body;
  const userid = req.userid;

  try {
    const addProperty = `INSERT INTO property (name, address, description, userid) VALUES (?, ?, ?, ?)`;
    const [addPropertyData] = await con.promise().query(addProperty, [name, address, description, userid]);
    const propertyId = addPropertyData.insertId;
    res.json({ propertyId, name, address, description, userid });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.showAllProperty = async (req, res) => {
  const userid = req.userid;
  try {
    const [rows] = await con.promise().query('SELECT * FROM property WHERE userid = ?', [userid]);
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// exports.updateEstimateStatus = async (req, res) => {
//   const { contractorworkid, status } = req.body;
//   const contractorid = req.userid;

//   try {
//     if (status === 'accepted') {
//       const deletetheremainingcon = `DELETE FROM contractorwork WHERE contractworkid != ?`;
//       await con.promise().query(deletetheremainingcon, [contractorworkid]);

//       const insertintoworkcontrator = `INSERT INTO workcontractor (workid, contractorid) VALUES (?, ?)`;
//       await con.promise().query(insertintoworkcontrator, [workId, contractorworkid]);

//       const selecttheworkid = `SELECT workid FROM contractwork WHERE contractworkid = ?`;
//       const [rows] = await con.promise().query(selecttheworkid, [contractorworkid]);
//       const workId = rows[0].workid;

//       const insertintowork = 'UPDATE work SET accept = ? WHERE workid = ?';
//       await con.promise().query(insertintowork, [1, workId]);

//       res.json(contractorworkid);
//     } else {
//       res.json({ message: 'Error: status not accepted' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.fetchPropertyEstimate = async (req, res) => {
  const userId = req.userid;
  try {
    const [rows] = await con.promise().query(`
      SELECT
        p.propertyid,
        p.name AS property_name,
        p.address AS property_address,
        u.userid AS owner_id,
        u.name AS owner_name,
        w.workid,
        wd.workdetailid,
        wd.description AS work_description,
        cu.userid AS contractor_id,
        cu.name AS contractor_name,
        cw.contractorworkid,
        cw.estimate,
        cw.time
      FROM
        property p
      JOIN
        work w ON p.propertyid = w.propertyid
      JOIN
        workdeatil wd ON w.workid = wd.workid
      JOIN
        contractorwork cw ON w.workid = cw.workid
      JOIN
        users cu ON cw.contactorid = cu.userid
      JOIN
        users u ON p.userid = u.userid
      WHERE
        cu.userid = ?
      ORDER BY
        p.propertyid, cw.contractorworkid;
    `, [userId]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEstimate = async (req, res) => {
  const propertyId = req.body.propertyId;

  try {
    const [rows] = await con.promise().query(`
     SELECT
    p.propertyid,
    p.name AS property_name,
    cw.contractorworkid,
    cw.estimate,
    cw.time,
    u.userid AS contractor_id,
    u.name AS contractor_name
FROM
    property p
JOIN
    contractorwork cw ON p.propertyid = cw.propertyid
JOIN
    users u ON cw.contactorid = u.userid
WHERE
    p.propertyid = ?;

    `, [propertyId]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};











exports.showAllPropertyContEstimation= async (req, res) => {
  try {
    const userid =req.userid;
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',userid)
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
    AND u.userid = ?
GROUP BY 
    p.propertyid, p.name, p.address, p.description, u.userid


    `,[userid]);
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





exports.addWork = async (req, res) => {
  const propertyId = req.params.propertyid;
  const { descriptions } = req.body;
  const files = req.files;
console.log("asdfg",files)
  try {
    const [workResult] = await con.promise().query(
      'INSERT INTO work (propertyid, complete,accept) VALUES (?, ?,?)',
      [propertyId, 0,0]
    );
    const workId = workResult.insertId;

    for (let i = 0; i < descriptions.length; i++) {
      const description = descriptions[i];
      console.log(`Processing description ${i + 1}/${descriptions.length}:`, description);

      const [detailResult] = await con.promise().query(
        'INSERT INTO workdeatil (workid, description) VALUES (?, ?)',
        [workId, description]
      );
      const workDetailId = detailResult.insertId;
      console.log(`Work Detail ID ${workDetailId} inserted for description ${description}`);



      const maxFilesPerDescription = 5;
      const startIdx = i * maxFilesPerDescription;
      const endIdx = Math.min(startIdx + maxFilesPerDescription, files.length);
      const descriptionFiles = files.slice(startIdx, endIdx);
      
      // let fileIndex = 0;
      // const numFiles = Math.ceil(files.length / descriptions.length);
      // const descriptionFiles = files.slice(fileIndex, fileIndex + numFiles);
      // fileIndex += numFiles;

      // const descriptionFiles = files.slice(i * 5, (i + 1) * 5);
            console.log('Description Files:', descriptionFiles);
            for (const file of descriptionFiles) {
              await await con.promise().query(
                    'INSERT INTO workimage (image, workdetailid) VALUES (?, ?)',
                    [file.filename, workDetailId]
              );
          }
      
  }

    res.json({
      message: 'Work added successfully',
      workId: workId,
      descriptions: descriptions
    });
  
  } catch (error) {
    console.error('Error in addWork:', error);
    res.status(500).json({ error: error.message });
  }
};





exports.updateEstimateStatus = async (req, res) => {
  const { contractorworkid, status } = req.body;
  const contractorid = req.userid;

  try {
    if (status === 'accepted') {
      console.log(`Received request to accept estimate with contractorworkid: ${contractorworkid} and status: ${status}`);

      // Select the propertyid from the contractorwork table
      const selectPropertyIdQuery = `SELECT propertyid FROM contractorwork WHERE contractorworkid = ?`;
      const [rows] = await con.promise().query(selectPropertyIdQuery, [contractorworkid]);

      if (rows.length === 0) {
        console.log(`No contractor work found with contractorworkid: ${contractorworkid}`);
        return res.status(404).json({ message: 'Contractor work not found' });
      }

      const propertyId = rows[0].propertyid;
      console.log(`Property ID associated with contractorworkid ${contractorworkid}: ${propertyId}`);

      // Delete all other contractor works for the same propertyid
      const deleteOtherContractorWorksQuery = `DELETE FROM contractorwork WHERE propertyid = ? AND contractorworkid != ?`;
      const deleteResult = await con.promise().query(deleteOtherContractorWorksQuery, [propertyId, contractorworkid]);
      console.log(`Deleted ${deleteResult.affectedRows} other contractor works for propertyid: ${propertyId}`);

      // Insert the accepted contractor work into the workcontractor table
      const insertIntoWorkContractorQuery = `INSERT INTO workcontractor (propertyid, contactorid) VALUES (?, ?)`;
      await con.promise().query(insertIntoWorkContractorQuery, [propertyId, contractorid]);
      console.log(`Inserted into workcontractor table: propertyid=${propertyId}, contractorid=${contractorid}`);

      // Update the work table to set the accept status to 1
      const updateWorkQuery = `UPDATE work SET accept = ? WHERE propertyid = ?`;
      await con.promise().query(updateWorkQuery, [1, propertyId]);
      console.log(`Updated work table: set accept=1 for propertyid=${propertyId}`);

      res.json({ message: 'Estimate accepted successfully', contractorworkid });
    } else {
      console.log(`Received request with status other than 'accepted': ${status}`);
      res.status(400).json({ message: 'Error: status not accepted' });
    }
  } catch (error) {
    console.error('Error in updateEstimateStatus:', error);
    res.status(500).json({ error: error.message });
  }
};




exports.getProofDataForOwner = async (req, res) => {
  const userid = req.userid;

  try {
    const [proofData] = await con.promise().query(
      `SELECT p.propertyid, p.name AS property_name, pw.proofworkid, pw.description AS proof_description
       FROM property p
       INNER JOIN proofwork pw ON p.propertyid = pw.propertyid
       WHERE p.userid = ?`,
      [userid]
    );
    res.json(proofData);
  } catch (error) {
    console.log('Error fetching proof data for owner:', error);
    res.status(500).json({ error: 'Failed to fetch proof data for owner' });
  }
};