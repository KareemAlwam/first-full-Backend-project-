import express from "express";
import path, {dirname} from 'path'
import { fileURLToPath } from "url";
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMIddleware from "./middleware/authMiddleware.js";
const app = express();
const PORT = process.env.PORT || 5003;  

// Get the file path form the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name form teh file path
const __dirname = dirname(__filename)

// Middleware
app.use(express.json())
// Servers the HTML file form the /public directory 
// Tells express to serve all files form the public folder as static assets /
// file. Any requests for the css files will be resolved to the public directory

app.use(express.static(path.join(__dirname,'../public')))

// Serving up the HTML file form /public directory
app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Routes 
app.use('/auth', authRoutes)
app.use('/todos', authMIddleware, todoRoutes)

app.listen(PORT, () => {
	console.log(`Server has started on port: ${PORT}`);
});
