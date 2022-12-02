var express = require('express'),
dotenv = require('dotenv'),
mongoose = require('mongoose'),
userRoutes = require('./routes/userRoute.js'),
bookRoutes = require('./routes/bookRoute.js'),
tourRoutes = require('./routes/tourRoute.js'),
userBuyRoutes = require('./routes/userBuyRoute.js');
payRoutes = require('./routes/paymentRoute.js');
chargeRoutes = require('./routes/userChargeRoute.js');

	
const app = express();
app.use(express.json());
dotenv.config();
let PORT = process.env.PORT || 90;
mongoose.connect("mongodb://daneshpa_daneshpa:eG7_Q^MK)mBS@daneshpark.org:27017/daneshpa_app");
app.listen(PORT, () => {
	console.log(`Server is up and running on ${PORT} ...`);
});
userRoutes(app);
bookRoutes(app);
tourRoutes(app);
userBuyRoutes(app);
payRoutes(app);
chargeRoutes(app);

