import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db/connection.js";
import { clerkClient, requireAuth } from '@clerk/express'
import dotenv from "dotenv";
import suggestionsRouter from "./routes/suggestions.js";
import outfitsRouter from "./routes/outfits.js";
import laundryRouter from "./routes/laundry.js";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import fs from 'fs';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const upload = multer({ dest: 'uploads/' });

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	}
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());


app.post("/register", async (req, res) => {
	const { id, email_addresses, first_name, last_name } = req.body.data;

	try {
		const usersCollection = db.collection("users");
		const existingUser = await usersCollection.findOne({ id });

		if (existingUser) {
			return res.status(200).json({ message: "User already exists." });
		}

		const newUser = {
			id,
			email_address: email_addresses?.[0]?.email_address,
			first_name,
			last_name,
			createdAt: new Date(),
		};

		const data = await usersCollection.insertOne(newUser);
		res.status(201).json({ message: "User created successfully.", newUser });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Internal server error." });
	}
});

app.post('/api/wardrobe/add', upload.single('image'), async (req, res) => {
	try {

		const wardrobeCollection = db.collection('wardrobe');

		const { name, type, tags, userId, color, pattern, style } = req.body;

		if (!name || !type || !tags || !tags.length || !userId) {
			return res.status(400).json({ error: "Missing required fields: name, type, tags (non-empty), or userId." });
		}
		const tagsArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

		const newItem = { name, type, tags: tagsArray, userId, laundryStatus: false };
		if (color) newItem.color = color;
		if (pattern) newItem.pattern = pattern;
		if (style) newItem.style = style;

		const result = await wardrobeCollection.insertOne(newItem);

		const file = req.file;
		if (file) {
			const fileStream = fs.createReadStream(file.path);
			const uploadParams = {
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: `${result.insertedId}.jpg`,
				Body: fileStream,
				ContentType: file.mimetype,
				ACL: 'public-read'
			};
			try {
				await s3.send(new PutObjectCommand(uploadParams));
				// const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
				await fs.unlinkSync(file.path);
			} catch (err) {
				console.error('Error uploading file to S3:', err);
				return res.status(500).json({ error: "Error uploading image." });
			}
		}

		res.status(201).json({
			message: "Item successfully added to wardrobe!",
			itemId: result.insertedId
		});
	} catch (error) {
		console.error("Error adding item to wardrobe:", error);
		res.status(500).json({ error: "An error occurred while adding the item." });
	}
});

// Routes
app.use("/api/suggestions", suggestionsRouter);

// Use the new outfits router
app.use("/api/outfits", outfitsRouter); // Updated route

app.use("/api/laundry", laundryRouter);

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});