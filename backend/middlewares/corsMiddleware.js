function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'your-frontend-url'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Add methods as needed
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add any other headers you need
    next(); // Call the next middleware or route handler
}
