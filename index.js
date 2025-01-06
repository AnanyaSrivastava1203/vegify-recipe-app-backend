const express = require('express')
const mongoose = require('mongoose');
const app = express();
const cors=require('cors');
const port = process.env.PORT||5000;

app.use(express.json());
app.use(cors());

//mongodb username:sriananya1203
//mongodb password:ISZHjWH84o2FtbTd

main().catch((err) => console.log("MongoDB Connection Error:", err));


async function main() {
  await mongoose.connect('mongodb+srv://sriananya1203:ISZHjWH84o2FtbTd@veggify-react-app.et3sd.mongodb.net/veggify-react-app?retryWrites=true&w=majority&appName=veggify-react-app');

  app.get('/', (req, res) => {
    res.send('Veggify Recipe App Server is running!')
  })
}




//routes
const ItemRoutes=require("./src/routes/itemRoute");
const CategoryRoutes=require("./src/routes/categoryRoute")
app.use('/api',ItemRoutes)
app.use('/api',CategoryRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
