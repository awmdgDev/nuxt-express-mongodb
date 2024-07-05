"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../src/models/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
// Create User
app.post("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const user = new user_1.default({ name, email });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Read Users
app.get("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update User
app.put("/api/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = yield user_1.default.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Delete User
app.delete("/api/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        else {
            res.status(204).send(); // No content
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
