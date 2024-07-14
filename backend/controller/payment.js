
const con = require("../config/config");
 const stripe = require('stripe')('sk_test_51Pbbz2Rudpshb9kygJ4vSHwjY7M6i6g1lfDZ2CkP6iCnn9ZCaipKVg8wiFeU2MUBxCJc6RUAWHilgoAihj1zhEOs00SglTIduK');


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
      success_url: 'http://localhost:8080/payment',
      // cancel_url: 'http://localhost:3000/cancel',
    });
if(session){
  const [pay] = await con.promise().query('UPDATE property_contractor.payment SET status = 1 WHERE paymentid = ?', [paymentdata]);
 
}
    res.json({ id: session.id });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getPaymentDetails = async (req, res) => {
  const contractorId = req.userid;

  try {
    const query = `
      SELECT 
        p.propertyid, 
        p.name as propertyName, 
        u.name as ownerName, 
        pm.amount, 
        pm.status, 
        pm.payment_date 
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
