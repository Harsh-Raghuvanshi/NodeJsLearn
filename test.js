const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 8000;

// Configure Multer to store uploaded files in 'uploads/' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Get the original file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Preserve the extension
  }
});


const upload = multer({ storage: storage })
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Handle form submission
app.post("/submit", upload.single("myphoto",20), (req, res) => {
  console.log("File:", req.file);  // Logs uploaded file details
  console.log("Body:", req.body);  // Logs text input fields

  return res.status(200).json({
    message: "Form submitted successfully!",
    fullName: req.body.fullName,
    college: req.body.college,
    fileUploaded: req.file ? req.file.filename : "No file uploaded"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
