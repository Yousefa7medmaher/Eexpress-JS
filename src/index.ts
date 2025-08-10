// src/index.ts
import express, { Request, Response } from 'express';
import mongoose, { Schema, model, Document } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3006;

app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('MongoDB connection error:', err));

// User interface
interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
}

// User schema and model
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
});

const User = model<IUser>('User', userSchema);

// Routes

// Get all users
app.get('/users', async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
});

// Create new user
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

// Update user by ID
app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid user ID or data' });
  }
});

// Delete user by ID
app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted' });
  } catch (err) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
});

 
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
