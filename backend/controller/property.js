const con = require("../config/config");

exports.addProperty = async (req, res) => {
  const { name, address, description } = req.body;
  const userid = req.userid;
  console.log("dfskuchfidsik",req.body)
  console.log(userid)
  try {
    const addProperty = `INSERT INTO property (name, address, description, userid) VALUES (?, ?, ?, ?)`;
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
  const [rows] = await con.promise().query('SELECT * FROM property WHERE userid = ?', [userid]);

  res.json(rows);
} catch (error) {
  res.json({ error: error.message });
}
}


// exports.addWork = async (req, res) => {
//   const propertyId = req.params.propertyid;
//   // console.log(propertyId);
//   const { description } = req.body;
//   // console.log(description);
//   const images = req.files;
// // console.log("images",images);
//   try {
// console.log("hello")
//     const addWorkQuery = `INSERT INTO property_contractor.work (propertyid, complete,accept) VALUES (?, ?,?)`;
//     const [workResult] = await con.promise().query(addWorkQuery, [propertyId, 0,0]);
    
// // console.log("workdata",workResult.insertId);
// console.log("workdata2",workResult);
//     const workId = workResult.insertId;
// // console.log("WORKID",workId);
// const addWorkDetailQuery = `INSERT INTO workdeatil (workid, description) VALUES (?, ?)`;
// const [workDetailResult] = await con.promise().query(addWorkDetailQuery, [workId, description]);
// const workDetailId = workDetailResult.insertId;
// // console.log("workDetailId",workDetailId);
//     const addWorkImagesQuery = `INSERT INTO workimage (workdetailid, image) VALUES (?, ?)`;
//     for (let file of images) {
//       const [workDetailImage]=  await con.promise().query(addWorkImagesQuery, [workDetailId, file.path]);
//       // res.json({workDetailImage})
//       console.log("efgieugiugrigufiurgfrigfigrigifgifgigifgirfgri",workDetailImage)
//     }
// console.log(description);
//     res.json({
//       message: 'Work added successfully',
//       work: {
//         workId,
//         description,
      
//       }
//     });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// };


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



 exports.updateEstimateStatus = async (req, res) => {
  const { contractorworkid, status } = req.body;
  const contractorid = req.userid; 

  try {
    if(status === 'accepted'){
      const deletetheremainingcon= `delete from contractorwork where contractworkid!=?`;
      await con.promise().query(deletetheremainingcon, [contractorworkid]);

      const insertintoworkcontrator = `insert into workcontractor (workid,contractorid)value(?,?)`;
      await con.promise().query(insertintoworkcontrator, [workId, contractorworkid]);
    
    
    const selecttheworkid=`select workid from contractwork where contractworkid=?`;
    const [rows]=await con.promise().query(selecttheworkid,[contractorworkid])
    const workId = rows[0].workid;

    const insertintowork ='update work set accept=? where workid=?';
    await con.promise().query(insertintowork, [1, workId]);


    res.json(contractorworkid)
    }else{
      res.json({message:error})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.addWork = async (req, res) => {
  const propertyId = req.params.propertyid;
  const { descriptions } = req.body;
  const images = req.files;

  if (!Array.isArray(descriptions)) {
    return res.status(400).json({ error: 'Descriptions must be an array' });
  }

  try {
    console.log("Inserting work entry for property:", propertyId);
    const addWorkQuery = `INSERT INTO property_contractor.work (propertyid, complete) VALUES (?, ?)`;
    const [workResult] = await con.promise().query(addWorkQuery, [propertyId, 0]);

    const workId = workResult.insertId;
    console.log("Work entry inserted with ID:", workId);

    for (let i = 0; i < descriptions.length; i++) {
      const description = descriptions[i];
      console.log("Inserting work detail entry for work ID:", workId, "Description:", description);
      const addWorkDetailQuery = `INSERT INTO workdeatil (workid, description) VALUES (?, ?)`;
      const [workDetailResult] = await con.promise().query(addWorkDetailQuery, [workId, description]);
      const workDetailId = workDetailResult.insertId;
      console.log("Inserted work detail with ID:", workDetailId);

      // Insert images corresponding to the current description
      if (images && images.length > 0) {
        for (let j = 0; j < images.length; j++) {
          const file = images[j];
          console.log(file)
          console.log("Inserting image entry for work detail ID:", workDetailId, "File path:", file.path);
          const addWorkImagesQuery = `INSERT INTO workimage (workdetailid, image) VALUES (?, ?)`;
          await con.promise().query(addWorkImagesQuery, [workDetailId, file.path]);
          console.log("Inserted image successfully.");
        }
      }
    }

    res.json({
      message: 'Work added successfully',
      work: {
        workId,
        descriptions,
      },
    });
  } catch (error) {
    console.error("Error adding work:", error.message);
    res.status(500).json({ error: error.message });
  }
};
