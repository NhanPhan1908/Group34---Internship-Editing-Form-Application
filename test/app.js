const express = require('express');
const sequelize = require('./config/config');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());

app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
