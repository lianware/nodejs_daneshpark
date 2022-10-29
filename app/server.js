var express = require('express'),
dotenv = require('dotenv'),
mongoose = require('mongoose'),
userRoutes = require('./routes/userRoute.js'),
bookRoutes = require('./routes/bookRoute.js'),
tourRoutes = require('./routes/tourRoute.js'),
userBuyRoutes = require('./routes/userBuyRoute.js');

	
const app = express();
app.use(express.json());
dotenv.config();
let PORT = process.env.PORT || 80;
mongoose.connect("mongodb://mongo:27017/lianware-park");
app.listen(PORT, () => {
	console.log(`Server is up and running on ${PORT} ...`);
});
userRoutes(app);
bookRoutes(app);
tourRoutes(app);
userBuyRoutes(app);