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


