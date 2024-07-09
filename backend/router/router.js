const express = require('express');
const router = express.Router();
const { registration, login, forgetpassword } = require('../controller/userAuth');
const { addProperty, showAllProperty, addWork,updateEstimateStatus,getEstimate,fetchPropertyEstimate,showAllPropertyContEstimation,getProofDataForOwner,addComment
  ,getcommentdescription,showProperties,showStatus,showWork } = require('../controller/property');
const { authenticate } = require('../middleware/authentication');
const { showAllPropertyCont, submitEstimate,proofData,addProof,getCommentProperties,getComments } = require('../controller/contractor');
const upload = require('../middleware/multer');

router.post("/registration", registration);
router.post("/login", login);
router.post("/forgetpassword", forgetpassword);
router.post('/addproperty', authenticate, addProperty);
router.get('/showproperty', authenticate, showAllProperty);
router.post('/addwork/:propertyid', upload.array('images', 100), addWork);
router.get('/showAllPropertyContEstimation', authenticate, showAllPropertyContEstimation);
router.get('/proofData', authenticate, proofData);
router.get('/showpropertycont', authenticate, showAllPropertyCont);
router.post('/getestimate', authenticate, getEstimate);
router.get('/fetchPropertyEstimate', authenticate, fetchPropertyEstimate);
router.get('/getProofDataForOwner', authenticate, getProofDataForOwner);
router.get('/getCommentProperties', authenticate, getCommentProperties);
router.post('/submitestimate', authenticate, submitEstimate);
router.post('/updateEstimateStatus', authenticate, updateEstimateStatus);
router.post('/addProof', authenticate,upload.array('images', 100), addProof);
router.get('/comments/:propertyId', getComments);
router.get('/commentdescription/:propertyId',authenticate,getcommentdescription)
router.get('/showProperties',authenticate,showProperties)
router.get('/showStatus',showStatus)
router.get('/showWork/:propertyid',showWork)


router.post('/addcomment',addComment)

module.exports=router;