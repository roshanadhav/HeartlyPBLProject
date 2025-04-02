import express from "express";
import cors from "cors";
import http from "http";
import multer from "multer";
import fs from "fs";
import { getDocument } from "pdfjs-dist";
import axios from "axios";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// 1-> defective heart
// 0-> healthy heart


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
}));

const server = http.createServer(app);
const upload = multer({ dest: "uploads/" });

const extractTextFromPDF = async (filePath) => {
    try {
        const data = new Uint8Array(fs.readFileSync(filePath));
        const pdf = await getDocument({ data }).promise;
        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            extractedText += textContent.items.map(item => item.str).join(" ") + "\n";
        }

        return extractedText || "⚠️ No text found in PDF";
    } catch (error) {
        console.error("❌ PDF Extraction Error:", error);
        return "❌ Error extracting text from PDF";
    }
};
app.use('/api/auth' , authRouter ) ;
app.use('/api/user' , userRouter ) ;

app.post("/predict", upload.single("file"), async (req, res) => {
    try {
        console.log("📥 Received request...");

        if (!req.file) {
            console.error("❌ No file uploaded");
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("📂 File uploaded successfully:", req.file);
        const filePath = req.file.path;

        if (!fs.existsSync(filePath)) {
            console.error("❌ Uploaded file not found:", filePath);
            return res.status(500).json({ error: "Uploaded file is missing" });
        }

        const extractedText = await extractTextFromPDF(filePath);
        const processExtractedText = (text) => {
            // Convert fractions like "120/80" to "120 80", remove commas
            const cleanedText = text.replace(/(\d+)\/(\d+)/g, '$1 $2').replace(/,/g, '');
        
            // Extract numbers (both integers and decimals)
            let words = cleanedText.match(/-?\d+(\.\d+)?/g) || [];
        
            // Convert extracted words to numbers
            let extractedData = words.map(Number);
        
            // **Manually check for missing values (slope, ca, thal)**
            if (extractedData.length < 13) {
                // Search for keywords to map missing values
                if (text.includes("Normal")) extractedData.push(3); // Example mapping for 'thal'
                if (text.includes("Reversible Defect")) extractedData.push(2); // Example mapping for 'thal'
                if (text.includes("Fixed Defect")) extractedData.push(1); // Example mapping for 'thal'
                
                // Fill remaining missing values with 0
                while (extractedData.length < 13) {
                    extractedData.push(0);
                }
            }
        
            return extractedData.slice(0, 13);
        };
        
        
        
        console.log("Extracted text  : " , processExtractedText(extractedText))
        console.log("📄 Extracted text:", extractedText);
        const response_of_model = await axios.post("http://localhost:5001/predict" , {features:processExtractedText(extractedText)})
        console.log(response_of_model.data)
        res.json({ prediction : response_of_model.data.prediction});

        // Cleanup uploaded file
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error("❌ PDF Processing Error:", error);
        res.status(500).json({ error: error.message });
    }
});



// Ensure `uploads` folder exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

server.listen(5000, () => {
    console.log("🚀 Server is listening on port 5000");
});