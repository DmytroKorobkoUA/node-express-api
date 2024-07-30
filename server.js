import express from 'express';
import taskRoutes from './routes/tasks.mjs';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/tasks', taskRoutes);

// Requests logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Express API!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
