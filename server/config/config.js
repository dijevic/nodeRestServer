process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let urlDB ;
if(process.env.NODE_ENV == 'dev'){
    urlDB ='mongodb://localhost:27017/MYCAFE'
}else{
urlDB ='mongodb+srv://diginho:holahola@cluster0.pb0xq.mongodb.net/MYCAFE'
}

process.env.URLDB = urlDB
