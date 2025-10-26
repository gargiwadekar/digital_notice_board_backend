const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://wadekargargi3_db_user:gargi2608@digitalnotice.xgrukag.mongodb.net/digitalNotice?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Error:", err));
