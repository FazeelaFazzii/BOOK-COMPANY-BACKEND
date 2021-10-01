//MAIN BACKEND FILE
require('dotenv').config();
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications.js");

const express = require("express");
const app = express();
app.use(express.json());

 //import the mongoose module
 var mongoose = require('mongoose');

 //Set up default mongoose connection
 var mongoDB =process.env.MONGODB_URI;
 mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));
 
  
  //http://localhost:3000/
 app.get("/", (req, res) => { 
    
    return res.json({"welcome": `to my backend software for the book company`});
   });


   /*
Route            /books
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
    //http://localhost:3000/books
app.get("/books", async(req, res) => { 
 const getAllBooks=await BookModel.find();
 return res.json(getAllBooks);
});



/*
Route            /book-isbn
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
//http://localhost:3000/book-isbn/12345Two
app.get("/book-isbn/:isbn",async (req, res) => { 
    
    const {isbn}=req.params;
    const getSpecificBook=await BookModel.findOne({ISBN:isbn});
    console.log(getSpecificBook);
    if(getSpecificBook===null) {
    return res.json({"error": `No books found for the isbn of ${isbn}`});
    }
     return res.json(getSpecificBook);
});


 /*
Route            /book-category
Description      Get specific book on category
Access           PUBLIC
Parameter        category
Methods          GET
*/
//http://localhost:3000/book-category/programming
app.get("/book-category/:category", async(req, res) => { 
   
    const {category}=req.params;
    const getSpecificBooks=await BookModel.find({category:category});
    if(getSpecificBooks.length===0) {
    return res.json({"error": `No books found for the isbn of ${category}`});
    }
    return res.json(getSpecificBooks);
});

/*
Route            /authors
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
//http://localhost:3000/authors
app.get("/authors", async(req, res) => { 
    const getAllAuthors=await AuthorModel.find();
    return res.json(getAllAuthors);
});
   
 //http://localhost:3000/author-id/1

 app.get("/author-id/:id", async(req, res) => { 
    const {id}=req.params;
    id=Number(id);
    const getSpecificAuthor=await AuthorModel.findOne({id:id});
    if(getSpecificAuthor===null) {
    return res.json({"error": `No author found for the id of ${id}`});
    }
     return res.json(getSpecificAuthor);
});  
//http://localhost:3000/author-isbn/12One
app.get("/author-isbn/:isbn", async(req, res) => { 
    const {isbn} =req.params;
    const getSpecificAuthors=await AuthorModel.find({books:isbn});
    if (getSpecificAuthors.length===0){
    return res.json({"error":`No authors found for isbn of ${isbn}`});
    }
    return res.json(getSpecificAuthors);
});
 //http://localhost:3000/publications
app.get("/publications", (req, res) => { 
    const getAllPublications=db.publications;
    return res.json(getAllPublications);
});
   //http://localhost:3000/publication-isbn/12345Two
app.post("/publication-isbn/:isbn", (req, res) => { 

});
//http://localhost:3000/book
app.post("/book", async(req, res) => { 
    const addNewBook=await BookModel.create(req.body);
    return res.json({bookAdded:addNewBook,message:"Book was added!!!"});
});
   //http://localhost:3000/author
app.post("/author",async (req, res) => { 
   
    const addNewAuthor= await AuthorModel.create(req.body);
    return res.json({authorAdded:addNewAuthor,message:"Author was added!!!"})
       });
//http://localhost:3000/publication
app.post("/publication", (req, res) => { 
db.publications.push(req.body);
return res.json(db.publications);
   });
   //http://localhost:3000/book-update/123Two
app.put("/book-update/:isbn", async(req, res) => { 
    const {isbn} =req.params;
    const updateBook=await BookModel.findOneAndUpdate({ISBN:isbn},req.body,{new:true});
   
    return res.json({bookUpdated:updateBook,message:"Book was updated!!!"});
});

//http://localhost:3000/author-update/1
    app.put("/author-update/:id", async(req, res) => { 
    const {id}=req.params;
    const updateAuthor=await AuthorModel.findOneAndUpdate({id:id},req.body,{new:true});
    
   return res.json({authorUpdated:updateAuthor,message:"Author was updated!!!"});
});


//http://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req, res) => { 
 });
//http://localhost:3000/book-delete/123Two
app.delete("/book-delete/:isbn", async(req, res) => { 
    
    const {isbn}=req.params;
    const deleteBook=await BookModel.deleteOne({ISBN:isbn});
    return res.json({bookDeleted:deleteBook,message:"Book was Deleted!!!"});
});  
//http://localhost:3000/book-author-delete/12One/1

app.delete("/book-author-delete/:isbn/:id", async(req, res) => { 
    
     const {isbn,id}=req.params;
     let getSpecificBook=await BookModel.findOne({ISBN:isbn});
     if(getSpecificBook===null) {
        return res.json({"error": `No books found for the isbn of ${isbn}`});
         }
         else{
             getSpecificBook.authors.remove(id);
             const updateBook=await BookModel.findOneAndUpdate({ISBN:isbn},getSpecificBook,{new:true});

         
    
     return res.json({bookUpdated:updateBook,message:"Author was deleted from the Book!!!"});
    }
});  
//http://localhost:3000/author-book-delete/12345ONE
app.delete("/author-book-delete/:isbn/:id", (req, res) => {
});

//http://localhost:3000/author-delete/1
app.delete("/author-delete/:id", (req, res) => {
    
    let {id}=req.params;
     id=Number(id);
    const filteredAuthors=db.authors.filter((author)=>author.id!==id);
     
    db.authors= filteredAuthors;
     return res.json(db.authors);
});
//http://localhost:3000/publication-delete/1
app.delete("/publication-delete/:id", (req, res) => {
    let {id}=req.params;
    id=Number(id);
  
   const filteredPublications=db.publications.filter((publication)=>publication.id!==id);
    db.publications= filteredPublications;
    return res.json(db.publications);

});

app.listen(3000,() => {


 console.log("my express app is running...")


}); 