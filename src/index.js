const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();
const {connectMongo} = require('./dbConnect/connection')
const Route =require('./Routes/Routes')
const respoRoutes =require('./Routes/repso')

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(Route)
app.use('/api/v1',respoRoutes)

// app.get('/',(req,res)=>{
// res.send('server is running')
// })
connectMongo()

const RAZORPAY_SECRET='NF7Q8ap3kN1xU1EBhfHkjb7C'
app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id:'rzp_test_kCoiUF3E4Tj2nL',
      key_secret: RAZORPAY_SECRET,
    });
   

    const options = req.body;
    console.log(options);
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.error.description);
  }
});

app.post("/order/validate", async (req, res) => {
    console.log(req);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

    console.log(razorpay_signature);
  const sha = crypto.createHmac("sha256",RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  console.log(digest);
  if (digest !== razorpay_signature) {
    return res.status(200).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});