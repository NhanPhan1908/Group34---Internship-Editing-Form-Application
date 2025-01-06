require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt')
const db = require('./db');
const bodyParser = require('body-parser');

app.use(express.json());

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:3001', // URL frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const { tokenController, logoutController, loginController } = require('./authController');
const { createFormController, getFormByIdController, updateFormController, deleteFormController } = require('./formController');
const authenticateToken = require('./authMiddleware');

const users = []

app.post('/token', tokenController);

app.delete('/logout', logoutController);

app.post('/login', loginController);

const posts = [
    { username: 'Saul', password: 'Goodman' },
    { username: 'Kim', password: 'Wexler' }
];

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

app.post('/forms', createFormController);

app.get('/forms/:id', getFormByIdController);

app.put('/forms/:id', updateFormController);

app.delete('/forms/:id', deleteFormController);

app.get('/', (req, res) => {
    res.json('Hello, World!');
});

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name == req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Not Allowed !!!')
        }
    } catch {
        res.status(500).send()
    }
})

app.post('/register', async (req, res) => {
    const { username, email, role, password } = req.body;
  
    try {
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Lưu vào cơ sở dữ liệu
      const query = 'INSERT INTO users (username, email, role, password) VALUES (?, ?, ?, ?)';
      db.query(query, [username, email, role, hashedPassword], (err, result) => {
        if (err) {
          console.error('Lỗi khi lưu dữ liệu:', err);
          if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).send({ message: 'Email already exists' });
          } else {
            res.status(500).send({ message: 'Server error' });
          }
          return;
        }
        res.status(201).send({ message: 'Registration successful!' });
      });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).send({ message: 'Server error' });
    }
  });

const documents = []

  function prepareDocumentStatus(docs) {
    return docs.map((doc) => {
      if (doc.status === "Valid") {
        return { name: doc.name, frontendStatus: "Valid" };
      } 
      else {
        return { name: doc.name, frontendStatus: "Invalid" };
      }
    });
  }

  const processedDocuments = prepareDocumentStatus(documents);

  console.log("Frontend Document Status:");
  processedDocuments.forEach((doc) =>
    console.log(` - ${doc.name}: ${doc.frontendStatus}`)
  );

  const forms = [];

function validateForm(form) {
    if (!form.name || !form.documentType || !form.updatedDate || !form.expiryDate) {
        return "Invalid";
    }
    const currentDate = new Date();
    const expiryDate = new Date(form.expiryDate);
    if (expiryDate < currentDate) {
        return "Invalid";
    }
    return "Valid";
}

app.use(bodyParser.json());

// Endpoint để lưu form vào cơ sở dữ liệu
app.post('/forms/submit', async (req, res) => {
  const { name, updatedDate, expiryDate, documentType } = req.body;
  const status = validateForm(req.body); // Hàm xác thực dữ liệu
  const sql = "INSERT INTO documents_info (name, updatedDate, expiryDate, documentType, status) VALUES (?, ?, ?, ?, ?)";
  const ret = await db.query(sql, [name, updatedDate, expiryDate, documentType, status], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
    }
  });

  if (ret[0].insertId == undefined) {
    res.status(500).json({ message: 'Error inserting data' });
  } else {
    res.status(201).json({ message: 'Form submitted', id: ret[0].insertId });
  }
});


// Endpoint để lấy danh sách forms từ cơ sở dữ liệu
app.get('/forms', (req, res) => {
  const sql = `SELECT * FROM documents`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ message: 'Error fetching data' });
    }

    res.json(results);
  });
});

app.use(bodyParser.json());

// Endpoint để lưu Internal Supervisor
app.post('/supervisors/internal', async (req, res) => {
  const { name, work_unit, email, phone_number } = req.body;
  const sql = `INSERT INTO internal_supervisors (name, work_unit, email, phone_number) VALUES (?, ?, ?, ?)`;
  try {
    const [result] = await db.query(sql, [name, work_unit, email, phone_number]);
    res.status(201).json({ message: 'Internal Supervisor saved', id: result.insertId });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ message: 'Error inserting data' });
  }
});

// Endpoint để lưu External Supervisor
app.post('/supervisors/external', async (req, res) => {
  const { name, work_unit, email, phone_number, position } = req.body;
  const sql = `
    INSERT INTO external_supervisors (name, work_unit, email, phone_number, position) VALUES (?, ?, ?, ?, ?)`;

  try {
    const [result] = await db.query(sql, [name, work_unit, email, phone_number, position]);
    res.status(201).json({ message: 'External Supervisor saved', id: result.insertId });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ message: 'Error inserting data' });
  }
});

// Endpoint để lấy danh sách Internal Supervisors
app.get('/supervisors/internal', async (req, res) => {
  const sql = 'SELECT * FROM internal_supervisors';

  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Endpoint để lấy danh sách External Supervisors
app.get('/supervisors/external', async (req, res) => {
  const sql = 'SELECT * FROM external_supervisors';

  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.post('/students', async (req, res) => {
  const {name, date_of_birth, major, unit, year, location, phone, topic, validation} = req.body;
  const sql = "INSERT INTO students (name, date_of_birth, major, unit, year, location, phone, topic, validation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  try {
    const [result] = await db.query(sql, [name, date_of_birth, major, unit, year, location, phone, topic, validation]);
    res.status(201).json({ message: 'Sutdent info saved', id: result.insertId });
  }  catch (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ message: 'Error inserting data' });
  }
});

app.post('/update-student-info', async (req, res) => {
  const { name, date_of_birth, major, year, email, phone} = req.body;
  const sql = "INSERT INTO students (name, date_of_birth, major, year, email, phone) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    const [result] = await db.query(sql, [name, date_of_birth, major, year, email, phone]);

    res.status(201).json({ message: 'Student info saved', id: result.insertId });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ message: 'Error inserting data' });
  }
});


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
