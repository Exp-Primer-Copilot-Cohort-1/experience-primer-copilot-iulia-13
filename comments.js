//create web server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
// db connection
const db = require('./db/connection');
// require routes
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
// require middleware
const cors = require('cors');
// require models
const Comment = require('./models/comment');
const User = require('./models/user');
const Post = require('./models/post');
// require passport
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
// require dotenv
require('dotenv').config();
// require path
const path = require('path');
// require socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

// set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

// passport config
require('./config/passport')(passport);

// connect to db
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.get('/', (req, res) => {
  res.send('hello');
});
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Socket.io
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', msg => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// Start server
http.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});