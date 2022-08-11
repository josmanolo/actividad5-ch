const express = require('express');

const app = express();

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

const productsList = [
    {
        id: 1,
        name: "Fender Duo-Sonic",
        price: 16500,
        thumbnail: "https://m.media-amazon.com/images/I/61ysTB0juPL._AC_SL1500_.jpg",
    },
    {
        id: 2,
        name: "Fender Telecaster Vintera",
        price: 24000,
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8n-9wHj_8NCXSnUIVv7JEf9xbhobnQhstoyQPmLnkNAkHjHB3-ttvK8aoM2wwAjRErPE&usqp=CAU",
    },
    {
        id: 3,
        name: "Martin Acoustic",
        price: 19350,
        thumbnail: "https://images.musicstore.de/images/1280/martin-guitars-000-10e_1_GIT0050169-000.jpg.webp",
    },
]


app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/products', (req, res) => {
    res.render('main', {list: productsList, layout: 'main'})
});

app.post('/products', (req, res) => {
    const { body } = req;
    console.log(body);
    const productsLength = productsList.length;

    const newProduct = {...body, id: productsList[productsLength - 1].id + 1 }
    productsList.push(newProduct);

    res.json({
        msg: `${body.name} agregado`,
    })
})



 

const port = 9090;
app.listen(port, () => {
    console.log(`Server running port ${port}`);
})