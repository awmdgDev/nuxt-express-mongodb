import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User, { IUser } from "../src/models/user";

dotenv.config();
const app: Application = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string, {
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));


// Define interfaces for request and response payloads
interface CreateUserRequest {
  name: string;
  email: string;
}

interface UpdateUserRequest {
  name: string;
  email: string;
}

// Create User
app.post("/api/users", async (req: Request<{}, {}, CreateUserRequest>, res: Response<IUser | { error: string }>) => {
  const { name, email } = req.body;

  try {
    const user: IUser = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Read Users
app.get("/api/users", async (req: Request<{}, {}, {}, {}>, res: Response<IUser[] | { error: string }>) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update User
app.put("/api/users/:id", async (req: Request<{ id: string }, {}, { name: string; email: string }>, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user: IUser | null = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User
app.delete("/api/users/:id", async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const user: IUser | null = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(204).send(); // No content
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
