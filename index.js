const express= require('express');
const bodyParser=require('body-parser');



const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;

const password='BXM8sLW5Q$JAm9Z';
const uri = "mongodb+srv://organicUser:BXM8sLW5Q$JAm9Z@cluster0.pjygh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',(req,res)=>{
    // res.send('Hello I am working'); 

    //sending file via node
    res.sendFile(__dirname+'/index.html');
})

client.connect(err => {
  const productCollection = client.db("myFirstDatabase").collection("products");




  //'Create' part of CRUD- Create has a relation with POST
  //https://docs.mongodb.com/guides/server/insert/

  app.post("/addProduct",(req,res)=>{
      const product=req.body;//as body theke read korte hobe,we need body-parser
    //   console.log(product);
      productCollection.insertOne(product)
      .then(result=>{
          console.log('product added');
          res.send('success');
      })  
  })


  //'Read' part of CRUD- Read has a relation with GET
  //https://docs.mongodb.com/guides/server/read/

  app.get('/products',(req,res)=>{
    productCollection.find({}) //empty {} means all data has to be retrieved from cluster database
    // productCollection.find({}).limit()//limiting how many data we will retrieve from cluster database
    .toArray((err,documents)=>{
        res.send(documents);
    })
  })


  //'Delete' part of CRUD- Delete has a relation with DELETE
  //https://docs.mongodb.com/guides/server/delete/

app.delete('/delete/:id',(req,res)=>{

    // console.log(req.params.id);

    productCollection.deleteOne({
        _id:ObjectId(req.params.id)
    })
    .then(result=> {
        // console.log(result)
        console.log(result.deletedCount);//deletedCount is a property of result which tells us how many number of results are deleted
})

})



//   app.post("/addProduct",(req,res)=>{
    // const product={
    //             name: "honey",
    //             price:25,
    //             quantity:20
    //           }
//     collection.insertOne(product)
//       .then(result=>{
//           console.log('one product added');
//       })    
//   })
//   console.log('database connected');//confirmation of connection to cloud database in clusters
 




  // perform actions on the collection object
//   client.close();
});

app.listen(3000);
