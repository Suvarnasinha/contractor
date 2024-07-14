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
      LEFT JOIN payment pay ON p.propertyid = pay.propertyid AND pay.status = 1
      WHERE wc.contactorid = 2 AND w.accept = 1 AND pay.paymentid IS NULL`,
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

      console.log(`Inserted proof data with proofworkid: ${proofworkid} inserted for description ${description}`);


      const maxFilesPerDescription =3;
      const startIdx = i * maxFilesPerDescription;
      const endIdx = Math.min(startIdx + maxFilesPerDescription, files.length);
      const descriptionFiles = files.slice(startIdx, endIdx);
      console.log("descriptionFiles",descriptionFiles);
      // Insert each image into proofworkimage table
      const insertImageQuery = 'INSERT INTO proofworkimage (proofdataid, image) VALUES (?, ?)';

        for (const file of descriptionFiles) {
          con.promise().query(insertImageQuery, [proofworkid, file.filename]);
          console.log(`Inserted image with path: ${file.filename} for proofworkid: ${proofworkid}`);
        }

    }

    res.status(200).json({ message: 'Proof data and images added successfully', proofDetails });
  } catch (error) {
    console.error('Error adding proof data:', error);
    res.status(500).json({ error: 'Failed to add proof data' });
  }
};


exports.getComments = async (req, res) => {
  const { propertyId } = req.params;
console.log(propertyId);
  try {
    const [comments] = await con.promise().query(
      `SELECT c.comment, c.commentid 
       FROM comment c 
       WHERE c.propertyid = ?`,
      [propertyId]
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
  SELECT DISTINCT p.propertyid, p.name AS property_name, p.address AS property_address, p.description AS property_description
      FROM property p
      INNER JOIN proofwork pw ON p.propertyid = pw.propertyid
      INNER JOIN comment c ON pw.propertyid = c.propertyid
      INNER JOIN workcontractor wc ON p.propertyid = wc.propertyid
      LEFT JOIN payment pay ON p.propertyid = pay.propertyid AND pay.status = 1
      WHERE wc.contactorid = ? AND pay.paymentid IS NULL
      ORDER BY p.propertyid
     `,  [userid]);

    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Error fetching properties' });
  }
}



exports.submitEstimate = async (req, res) => {
    const { propertyid, estimate, time } = req.body;
    const contractorid = req.userid;

    try {
        // Insert the estimate into contractorwork table
        const submitEstimateQuery = `
            INSERT INTO contractorwork (propertyid, estimate, time, contactorid) 
            VALUES (?, ?, ?, ?);
        `;
        await con.execute(submitEstimateQuery, [propertyid, estimate, time, contractorid]);

        // Fetch property owner's user ID
        const [rows] = await con.execute(`
            SELECT userid FROM property WHERE propertyid = ?
        `, [propertyid]);
        const propertyOwnerUserId = rows[0].userid;

        // Check if there's an existing chat participant entry
        const [existingParticipants] = await con.execute(`
            SELECT * FROM chat_participant WHERE property_id = ? AND contractor_id = ?
        `, [propertyid, contractorid]);

        if (existingParticipants.length === 0) {
            // If no existing entry, insert new chat participant entry
            const insertParticipantQuery = `
                INSERT INTO chat_participant (property_id, contractor_id) 
                VALUES (?, ?);
            `;
            await con.execute(insertParticipantQuery, [propertyid, contractorid]);
        }

        // Fetch all contractors associated with the property (excluding the sender)
        const [contractors] = await con.execute(`
            SELECT u.userid, u.name
            FROM users u
            JOIN chat_participant cp ON u.userid = cp.contractor_id
            WHERE cp.property_id = ? AND u.userid != ?
        `, [propertyid, contractorid]);

        res.json({
            propertyid,
            estimate,
            time,
            contractorid,
            propertyOwnerUserId,
            contractors
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// router.post('/contractChat/:propertyid',contractChat)
exports.contractChat = async (req, res) => {
  const propertyId  = req.params.propertyid;
  try {
         const [owner] = await con.promise().query(
             'SELECT u.userid, u.name FROM users u JOIN property p ON u.userid = p.userid WHERE p.propertyid = ?',
             [propertyId]
         );
         res.json(owner[0]);
     } catch (error) {
         console.error('Error fetching property owner:', error);
         res.status(500).json({ error: 'Internal server error' });
     }
};
// router.post('/chat/message',authenticate,sendChat)
exports.sendChat = async (req, res) => {
    const sender_id=req.userid
    const { receiver_id, message,propertyid} = req.body;
   console.log("message for user=========",message)
   console.log("message for receibver=========",receiver_id)
    try {
      const [send] = await con.promise().query(
        'INSERT INTO chat_message (propertyid, senderid, receiverid, message) VALUES (?, ?, ?, ?)',
        [propertyid, sender_id, receiver_id, message]
      );
        res.status(201).json({ message: 'Message sent successfully',send });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// router.get('/chat/show/:propertyid',seeMessage)


exports.seeMessage=async(req,res)=>{
  const propertyId  = req.params.propertyid;
  console.log("object",propertyId);
  try{
    const [messages] = await con.promise().query(
      `SELECT * FROM chat_message 
       WHERE propertyid = ? AND 
       (senderid = ? OR receiverid = ?)`,
      [propertyId, userId, userId]
    );
    res.json(messages);
  }catch(error){
    console.log("error while fetching the message",error);
  }
}


exports.getArchivedPropertiesContractor = async (req, res) => {
  const contractorId = req.userid;
  try {
    const [properties] = await con.promise().query(
      `SELECT DISTINCT 
         p.propertyid, 
         p.name AS property_name, 
         p.address AS property_address, 
         p.description AS property_description,
         cw.estimate
       FROM property p
       INNER JOIN work w ON p.propertyid = w.propertyid
       INNER JOIN workcontractor wc ON p.propertyid = wc.propertyid
       LEFT JOIN payment pay ON p.propertyid = pay.propertyid AND pay.status = 1
       LEFT JOIN contractorwork cw ON p.propertyid = cw.propertyid AND wc.contactorid = cw.contactorid
       WHERE wc.contactorid = ? AND w.accept = 1 AND pay.paymentid IS NOT NULL`,
      [contractorId]
    );
    res.json(properties);
  } catch (error) {
    console.error('Error fetching archived properties:', error);
    res.status(500).json({ error: 'Error fetching archived properties' });
  }
};
