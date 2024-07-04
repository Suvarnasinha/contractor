const con = require("../config/config");

exports.addProperty = async (req, res) => {
  const { name, address, description } = req.body;
  const userid = req.userid;

  try {
    const addProperty = `INSERT INTO property (name, address, description, userid,accept) VALUES (?, ?, ?, ?)`;
    let addPropertyData =await con.promise().query(addProperty,[name, address, description, userid]);
    console.log("userid",userid);
    console.log("object",addPropertyData[0].insertId);
    const propertyId = addPropertyData[0].insertId;
    res.json({ propertyId,name,address,description, userid });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.showAllProperty=async(req,res)=>{
  const userid = req.userid;
try {
  const propertiesQuery = 'SELECT * FROM properties WHERE userid = ?';
  const [properties] = await con.promise().query(propertiesQuery, [userid]);
  res.json(properties);
} catch (error) {
  res.json({ error: error.message });
}
}

exports.addWork = async (req, res) => {
  const propertyId = req.params.propertyid;
  const descriptions = req.body.description;
  const images = req.files;

  try {
    const addWorkQuery = `INSERT INTO work (propertyid, complete, accept) VALUES (?, ?, ?)`;
    const [workResult] = await con.promise().query(addWorkQuery, [propertyId, 0, 0]);
    
    const workId = workResult.insertId;

    for (let i = 0; i < descriptions.length; i++) {
      const addWorkDetailQuery = `INSERT INTO workdetail (workid, description) VALUES (?, ?)`;
      const [workDetailResult] = await con.promise().query(addWorkDetailQuery, [workId, descriptions[i]]);
      
      const workDetailId = workDetailResult.insertId;

      const addWorkImagesQuery = `INSERT INTO workimage (workdetailid, image) VALUES (?, ?)`;
      await con.promise().query(addWorkImagesQuery, [workDetailId, images[i].path]);
    }

    res.json({
      message: 'Work added successfully',
      work: {
        workId,
        descriptions,
        images: images.map(image => image.path)
      }
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};


exports.getEstimate=async(req,res)=>{
  const propertyId = req.params.propertyid;
  try {
    const [rows] = await con.promise().query(`select p.name,w.estimate,w.time from property p join contractorwork w on p.propertyid=w.propertyid
    where p.propertyid=?;`, [propertyId]);
  
    res.json(rows);
  } catch (error) {
    res.json({ error: error.message });
  }
}


exports.selectContractor=async(req,res)=>{
  
}





// Update estimate status (accept or reject)
exports.updateEstimateStatus = async (req, res) => {
  const { contractorworkid, status } = req.body;
  const contractorid = req.userid; // Assuming userid is set in authentication middleware

  try {
    if (status === 'rejected') {
      // Delete the rejected estimate
      const deleteQuery = `
        DELETE FROM contractorwork
        WHERE contractorworkid = ?
      `;
      await con.execute(deleteQuery, [contractorworkid]);
    } else if (status === 'accepted') {
      const getWorkIdQuery = `
        SELECT cw.workid
        FROM contractorwork cw
        WHERE cw.contractorworkid = ?
      `;
      const [rows] = await con.promise().query(getWorkIdQuery, [contractorworkid]);
      const workId = rows[0].workid;

      // Update the status to 'accepted'
      const updateQuery = `
        UPDATE contractorwork
        SET accept = ?
        WHERE workid = ? AND contractorworkid != ?
      `;
      await con.execute(updateQuery, ['rejected', workId, contractorworkid]);

      // Insert into workcontractor
      const insertQuery = `
        INSERT INTO workcontractor (workid, contactorid)
        VALUES (?, ?)
      `;
      await con.execute(insertQuery, [workId, contractorid]);
    }
    res.json({ message: 'Estimate status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
