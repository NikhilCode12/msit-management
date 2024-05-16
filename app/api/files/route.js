import { connectToDatabase } from "../students/route";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import { GridFSBucket, ObjectId, MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import nextConnect from "next-connect";
import { createReadStream } from "fs";

let gfs;
connectToDatabase.once("open", () => {
  gfs = Grid(connectToDatabase.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});
const upload = multer({ storage, dest: "./uploads_file" });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));
export async function POST(request) {
  try {
    const { file } = request.json();
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
    });
    const db = client.db("studentdb");
    const bucket = new GridFSBucket(db);

    const uploadStream = bucket.openUploadStream(file.originalname);
    const readStream = createReadStream(file.path);
    readStream.pipe(uploadStream);
    uploadStream.on("error", () => {
      NextResponse.json({ error: "Failed to upload file!" }, { status: 500 });
    });

    uploadStream.on("finish", () => {
      NextResponse.json(
        { message: "File uploaded successfully!" },
        { status: 200 }
      );
    });
  } catch (err) {
    console.log("Error : ", err);
  }
}

export default apiRoute;
