import express from "express";
import type { NextFunction, Request, Response } from "express"
import { config } from "dotenv";
import cors from "cors";
import path from "path";




import { fileURLToPath } from "url";



import { createServer } from "http";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import { checkAdmin, protect } from "./middlewares/authMiddleware.js";
import { SeedUser } from "./controllers/userController.js";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
config();
export const CLIENT_URL=process.env.CLIENT_URL;
const server = createServer(app); // http

app.use(express.json());

// app.use(cors());
 app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);






app.get("/api/test",(req:Request,res:Response)=>{
  
  return res.status(200).json({message:"this is test server is working",client:process.env.CLIENT_URL,requiestIp:req.ip});
})

app.use(
  "/uploads",
  express.static(path.join(path.dirname(__dirname), "uploads"))
);
app.use("/api/user",protect,checkAdmin,userRouter);
app.use("/api",authRouter)

// Sanitize PORT: remove any non-digit characters and parse to integer
const rawPort = String(process.env.PORT ?? "").trim();
const numericPort = parseInt(rawPort.replace(/[^0-9]/g, ""), 10);
const PORT =
  Number.isFinite(numericPort) && numericPort > 0 ? numericPort : 3500;

 


//SeedUser({firstName:"Laoufi",lastName:"Lamine",username:"lamine",password:"lamine@gmail.com",roleId:"admin",email:"lamine@gmail.com"})
server.listen(PORT, (err?: Error) => {
  if (err) console.error("Server failed to start:", err);
  console.log(`Server running on port ${PORT}`);
});





