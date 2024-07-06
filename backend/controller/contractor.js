const con = require("../config/config");

exports.showAllPropertyCont = async (req, res) => {
  try {
    const [rows] = await con.promise().query(`
      SELECT p.propertyid, p.name AS property_name, p.address, pd.description, pri.image, u.userid 
      FROM property p 
      JOIN work w ON p.propertyid = w.propertyid 
      JOIN workdeatil pd ON w.workid = pd.workid 
      JOIN workimage pri ON pd.workdetailid = pri.workdetailid 
      JOIN users u ON p.userid = u.userid 
      WHERE w.accept = 0
    `);

    // Group works by propertyid
    const properties = {};
    rows.forEach(row => {
      if (!properties[row.propertyid]) {
        properties[row.propertyid] = {
          propertyid: row.propertyid,
          name: row.property_name,
          address: row.address,
          works: []
        };
      }
      properties[row.propertyid].works.push({
        workid: row.workid,
        description: row.description,
        image: row.image,
        userid: row.userid
      });
    });

    res.json(Object.values(properties));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.submitEstimate = async (req, res) => {
  const { workId, estimate, time } = req.body;
  console.log("daraaaasasasasasasa",req.body);
  const contractorid = req.userid;
  try {
    const submitEstimateQuery = `
      INSERT INTO contractorwork (workid, estimate, time, contactorid) 
      VALUES (?, ?, ?, ?);
    `;
    await con.execute(submitEstimateQuery, [workId, estimate, time, contractorid]);
    res.json({ workId, estimate, time,contractorid});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};