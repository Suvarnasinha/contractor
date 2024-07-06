const express = require('express');
const router = express.Router();
const { registration, login, forgetpassword } = require('../controller/userAuth');
const { addProperty, showAllProperty, addWork } = require('../controller/property');
const { authenticate } = require('../middleware/authentication');
const { showAllPropertyCont, submitEstimate } = require('../controller/contractor');
const upload = require('../middleware/multer');

router.post("/registration", registration);
router.post("/login", login);
router.post("/forgetpassword", forgetpassword);
router.post('/addproperty', authenticate, addProperty);
router.get('/showproperty', authenticate, showAllProperty);
router.post("/addwork/:propertyid", authenticate, upload.array('images', 10), addWork);

router.get('/showpropertycont', authenticate, showAllPropertyCont);
router.post('/submitestimate', authenticate, submitEstimate);

module.exports=router;