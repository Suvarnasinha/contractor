
const con = require("../config/config");
 const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


    exports.payment=async (req,res)=>{
  const { propertyId } = req.body;

  try {
    const [result] = await con.promise().query('SELECT estimate FROM contractorwork WHERE propertyid = ?', [propertyId]);
    const estimate = result[0]?.estimate || 0;

    const [name]=await con.promise().query('SELECT u.name AS contractor_name,u.userid as Userid FROM proofwork pw JOIN property p ON pw.propertyid = p.propertyid JOIN work w ON p.propertyid = w.propertyid JOIN workcontractor wc ON w.propertyid = wc.propertyid JOIN users u ON wc.contactorid = u.userid WHERE pw.propertyid = ? LIMIT 1', [propertyId]);
    const contractorName = name[0].contractor_name;
    const contractorid = name[0].Userid;

    const addCommentQuery = `INSERT INTO property_contractor.payment (propertyid, contractorid, amount) VALUES (?,?,?)`;
    await con.promise().query(addCommentQuery, [propertyId, contractorid,estimate]);

    const [paymentid] = await con.promise().query('SELECT paymentid FROM payment WHERE propertyid = ?', [propertyId]);
    const paymentdata = paymentid[0].paymentid;


    console.log("estimate data",paymentdata)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: `Payment to ${contractorName}`,
          },
          unit_amount: estimate,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:8081/payment',
      // cancel_url: 'http://localhost:3000/cancel',
    });
if(session){
  console.log("session id is here")
  const [pay] = await con.promise().query('UPDATE property_contractor.payment SET status = 1 WHERE paymentid = ?', [paymentdata]);
  const addWorkState = `INSERT INTO propertystate (propertyId, state) VALUES (?, ?);`;
  const [addWorkStateData] = await con.promise().query(addWorkState, [propertyId, 'Payment Successful']);
  const addWorkStateCon = `INSERT INTO property_contractor.contractorstate (propertyId, state) VALUES (?, ?); `;
  const [addWorkStateDataCon] = await con.promise().query(addWorkStateCon, [propertyid, 'Payment Successful']);
}
    res.json({ id: session.id });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getPaymentDetails = async (req, res) => {
  const contractorId = req.userid;
  console.log("contractorid",contractorId);
  try {
    const query = `
      SELECT distinct
        p.propertyid, 
        p.name as propertyName, 
        u.name as ownerName, 
        pm.amount, 
        pm.status
      FROM payment pm
      JOIN property p ON pm.propertyid = p.propertyid
      JOIN users u ON p.userid = u.userid
      WHERE pm.contractorid = ?
    `;

    const [rows] = await con.promise().query(query, [contractorId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
