const http = require('http'); //importing http module 
const fs = require('fs'); // reading the files(html,css,js)
const path = require('path');//handling the path correctly

const port = 3000; //port declaration

const app = http.createServer((req, res) => {  //creating the server 
    const url=req.url;  //captures everything after the URL
    let filename= '';   //empty string variable

//Routing Logic (if user asks for the home page it will point to home.html if doesn't match any known page it will point to 404.html)
    if(url === '/' || url === '/home'){
        filename='./home.html';
    }
    else if(url === '/about'){
        filename='./aboutUs.html';
    }
    else if(url === '/contact'){
        filename='./contactUs.html';
    }
    else{
        filename='./404.html';
    }


   const filePath = path.join(__dirname,filename);    //creating the full path for the files
   const navPath = path.join(__dirname,'./nav.html'); //creating the full path for the nav.html

   // read the file asynchronously
   fs.readFile(navPath, (Err, navData) => {
    if (Err) {
      console.error("nav load error!!",Err);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      return res.end('<h1>500 internal server error</h1>');
    }
      fs.readFile(filePath, (err, data) => {
    if (err) {// if the file itself is missing otherwise its a server side issue {500}
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 internal server error</h1>');
    } else {// send 404 status if we are serving the 404.html, otherwise 200 status
        const status = filename === './404.html' ? 404 : 200;
        res.writeHead(status, { 'Content-Type': 'text/html' });
        res.end(navData + data);
    }
  });
}); 
});

//starting the server with Url
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
});
