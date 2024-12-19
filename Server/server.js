import { app } from "./app.js";
import http from 'http'
const port = process.env.PORT || 1200;

const server = http.createServer(app);
try {
    server.listen(port , ()=>{
        console.log(`server is running on port http://localhost:${port}`)
    });
} catch (error) {
    console.error('Error starting server:', error);
}