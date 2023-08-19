const express = require('express');
// require('dotenv').config();
const app = express();

const wallPaperRoute = require('./sqlRoutes/Wallpaper.route');
const categoriesRoute = require('./sqlRoutes/Category.route');
const subCategoriesRoute = require('./sqlRoutes/SubCategory.route');
const colorRoute = require('./sqlRoutes/Color.route');
const authRoute = require('./sqlRoutes/Auth.route');
const userRoute = require('./sqlRoutes/User.route');

const cors = require('cors');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

app.use('/auth', authRoute.router);
app.use('/category', categoriesRoute.router);
app.use('/subcategory', subCategoriesRoute.router);
app.use('/wallpaper', wallPaperRoute.router);
app.use('/color', colorRoute.router);
app.use('/user', userRoute.router);

app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
