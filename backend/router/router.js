const express = require('express');
const router = express.Router();
const{registration,login,forgetpassword}=require('../controller/userAuth')

router.post("/registration", registration);
router.post("/login", login);
router.post("/forgetpassword", forgetpassword);
module.exports=router;






const upload = require('../middlewares/multer');
const { addProperty, addWork } = require('../controllers/property');
const authenticateJWT = require('../middlewares/auth');

// POST /api/property/addProperty
router.post('/addProperty', authenticateJWT, addProperty);

// POST /api/property/:propertyid/addWork
router.post('/:propertyid/addWork', authenticateJWT, upload.array('images', 10), addWork);
router.get('/estimates', authenticateJWT, getUnselectedEstimates);

// POST /api/constructor/submitEstimate
router.post('/submitEstimate', authenticateJWT, submitEstimate);

// POST /api/constructor/selectEstimate
router.post('/selectEstimate', authenticateJWT, selectEstimate);

module.exports = router;








// router.js

const express = require('express');
const router = express.Router();
const userAuth = require('../controllers/userAuth');
const property = require('../controllers/property');
const constructor = require('../controllers/constructor');

// User Authentication
router.post("/registration", userAuth.registration);
router.post("/login", userAuth.login);
router.post("/forgetpassword", userAuth.forgetpassword);

// Property Management
router.post("/addproperty", property.addProperty);
router.post("/addwork/:propertyid", property.addWork);
router.get("/getestimates", property.getEstimates);
router.post("/selectestimate", property.selectEstimate);

// Contractor Operations
router.get("/getunselectedestimates", constructor.getUnselectedEstimates);
router.post("/submittestimate", constructor.submitEstimate);
router.post("/selectestimate", constructor.selectEstimate);
router.post("/submitproofofwork", constructor.submitProofOfWork);
router.get("/getproofofwork", constructor.getProofOfWorkWithComments);

module.exports = router;

