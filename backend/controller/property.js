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

exports.updateEstimateStatus = async (req, res) => {
  const { contractorworkid, status } = req.body;
  const contractorid = req.userid;

  try {
    if (status === 'accepted') {
      const deletetheremainingcon = `DELETE FROM contractorwork WHERE contractworkid != ?`;
      await con.promise().query(deletetheremainingcon, [contractorworkid]);

      const insertintoworkcontrator = `INSERT INTO workcontractor (workid, contractorid) VALUES (?, ?)`;
      await con.promise().query(insertintoworkcontrator, [workId, contractorworkid]);

      const selecttheworkid = `SELECT workid FROM contractwork WHERE contractworkid = ?`;
      const [rows] = await con.promise().query(selecttheworkid, [contractorworkid]);
      const workId = rows[0].workid;

      const insertintowork = 'UPDATE work SET accept = ? WHERE workid = ?';
      await con.promise().query(insertintowork, [1, workId]);

      res.json(contractorworkid);
    } else {
      res.json({ message: 'Error: status not accepted' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.addWork = async (req, res) => {
//   const propertyId = req.params.propertyid;
//   const [descriptions] = req.body.descriptions;

//   console.log("desc", descriptions);
//   const images = req.files;
//   console.log("image", images);


//   try {
//     const addWorkQuery = `INSERT INTO work (propertyid, complete,accept) VALUES (?, ?,?)`;
//     const [workResult] = await con.promise().query(addWorkQuery, [propertyId, 0,0]);
//     const workId = workResult.insertId;
//     console.log('Work ID:', workId);

//     for (let i = 0; i < descriptions.length; i++) {
//       const descriptionItem = descriptions[i];
//       console.log('Description:', descriptionItem);

//       const addWorkDetailQuery = `INSERT INTO workdeatil (workid, description) VALUES (?, ?)`;
//       const [workDetailResult] = await con.promise().query(addWorkDetailQuery, [workId, descriptionItem]);
//       const workDetailId = workDetailResult.insertId;
//       console.log('Work Detail ID:', workDetailId);

//       if (images && images.length > 0) {
//         for (let j = 0; j < images.length; j++) {
//           const file = images[j];
//           const addWorkImagesQuery = `INSERT INTO workimage (workdetailid, image) VALUES (?, ?)`;
// await con.promise().query(addWorkImagesQuery, [workDetailId, file.path]);
//         }
//       }
//     }

//     res.json({
//       message: 'Work added successfully',
//       work: { workId, descriptions },
//     });
//   } catch (error) {
//   console.error('Error in addWork:', error);
//   res.status(500).json({ error: error.message });
// }
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
    p.propertyid = 3;

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
  const images = req.files;

  try {
    // Insert into work table
    const addWorkQuery = `INSERT INTO work (propertyid, complete, accept) VALUES (?, ?, ?)`;
    const [workResult] = await con.promise().query(addWorkQuery, [propertyId, 0, 0]);
    const workId = workResult.insertId;
    console.log('Work ID inserted:', workId);

    // Process each description and corresponding images
    for (let i = 0; i < descriptions.length; i++) {
      const description = descriptions[i];
      console.log(`Processing description ${i + 1}/${descriptions.length}:`, description);

      // Insert into workdetail table
      const addWorkDetailQuery = `INSERT INTO workdeatil (workid, description) VALUES (?, ?)`;
      const [workDetailResult] = await con.promise().query(addWorkDetailQuery, [workId, description]);
      const workDetailId = workDetailResult.insertId;
      console.log(`Work Detail ID ${workDetailId} inserted for description ${description}`);

      // Insert images associated with the current description
      for (let j = 0; j < images.length; j++) {
        const file = images[j];
        const addWorkImagesQuery = `INSERT INTO workimage (workdetailid, image) VALUES (?, ?)`;
        await con.promise().query(addWorkImagesQuery, [workDetailId, file.path]);
        console.log(`Image ${file.originalname} inserted for Work Detail ID ${workDetailId}`);
      }
    }

    // Respond with success message
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
