const express = require('express');
const router = express.Router();
const { registration, login, forgetpassword } = require('../controller/userAuth');
const { addProperty, showAllProperty, addWork,updateEstimateStatus,getEstimate,fetchPropertyEstimate,showAllPropertyContEstimation,getProofDataForOwner,addComment
  ,getcommentdescription,showProperties,showStatus,showWork,seechatperson,archivedProperty } = require('../controller/property');
const { authenticate } = require('../middleware/authentication');
const { showAllPropertyCont, submitEstimate,proofData,addProof,getCommentProperties,getComments,contractChat,sendChat,seeMessage,getArchivedPropertiesContractor,showConStatus } = require('../controller/contractor');
const upload = require('../middleware/multer');
const{payment,getPaymentDetails}=require('../controller/payment');

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
router.post('/updateEstimateStatus', authenticate, updateEstimateStatus);
router.post('/addProof', authenticate,upload.array('images', 100), addProof);
router.get('/comments/:propertyId',getComments);
router.get('/commentdescription/:propertyId',authenticate,getcommentdescription);
router.get('/showProperties',authenticate,showProperties);
router.get('/showStatus/:propertyid',showStatus);
router.get('/showConStatus/:propertyid',showConStatus);
router.get('/showWork/:propertyid',showWork);
router.post('/contractChat/:propertyid',contractChat)
router.post('/chat/message',authenticate,sendChat)
router.post('/chat/show/:propertyid',authenticate,seeMessage)
router.post('/addcomment',addComment)
router.get('/chat/property/:propertyid',authenticate,seechatperson)
router.post('/checkout',payment)
router.get('/getPayment',authenticate,getPaymentDetails)
router.get('/getArchivedProperties',authenticate,archivedProperty)
router.get('/getArchivedContractor',authenticate,getArchivedPropertiesContractor)
module.exports=router;