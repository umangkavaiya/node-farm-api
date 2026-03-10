//* All the modules included here at the top
const fs = require("fs");
const http = require("http");
const url = require("url");

//? const replaceTemplate = require(./modules/replaceTemplate); -> Our own module created for replace template function

//^ File Reading
//! Blocking and synchronous nature
// const textIN = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIN);
//
// const textOut = `This is what we know about avocado: ${textIN}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

//* Non - blocking and asynchronous in nature
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//?  writing into a file
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your files have been written");
//       });
//     });
//   });
// });

// console.log("Reading Files ...");

//^ SERVER
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
);
const tempCards = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//! We can also add this replace template function into our owm modules and import it from there

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

//! creating the server with http module
const server = http.createServer((req, res) => {
  //* Setting up the routes for the url
  const { query, pathname } = url.parse(req.url, true);
  console.log(pathname);

  // This is for overview
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCards, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCTS_CARDS%}", cardsHtml);

    res.end(output);

    // This is for product
  } else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // This is for API
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

    // console.log(productData[2].productName);
    // res.end("This is API");
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-head": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }

  //* for example: res.end("Hello from the server");  This callback will be called every time the server gets a request
});

//! Now handling or listening the requests from the client (Starting the server)
server.listen(8000, "127.0.0.1", () => {
  //& The first para is port number and second is host address means here the localhost(127.0.0.1)
  console.log("listening to the requests on port 8000");
});
