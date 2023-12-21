const Ebook = require('../schema/productchema');
const mongoose = require('mongoose')

// const addEbooks = async (req, res) => {
//     // Destructuring request body
//     const ebooksData = req.body;
//     try {
//       const createdEbooks = [];
//       const commonBookId = new mongoose.Types.ObjectId(); // Generate a common identifier

//       for (const language in ebooksData) {
//         const ebook = ebooksData[language];

//         const { title, price, ebook_description, ebook_subtitle, pages, maxpage } = ebook;
//         // const requiredFields = [title, price, ebook_description, ebook_subtitle, pages, maxpage];
//         // if (requiredFields.some((field) => !field)) {
//         //   console.error("addEbooks: Missing required fields for an ebook.");
//         //   return res.status(400).json({ message: "All fields are required for each ebook." });
//         // }
//         // Creating a new Ebooks document with the common identifier
//         const bookData = new Ebooks({
//           title,
//           price,
//           ebook_description,
//           ebook_subtitle,
//           datecreated: new Date(),
//           pages,
//           maxpage,
//           language,
//           bookId: commonBookId,
//         });
//         await bookData.save();
//         createdEbooks.push(bookData);
//       }
//       return res.status(200).json({ status: 200, message: "Ebooks Created Successfully!", createdEbooks });
//     } catch (error) {
//       console.log("Error in addEbooks:", error);
//       return res.status(500).json({ error: "An error occurred", error: error.message });
//     }
//   };


const ebookController = async (req, res) => {
    const hId =new mongoose.Types.ObjectId()
    const hEn =new mongoose.Types.ObjectId()
    const { hindi, english } = req.body
    const newhindi ={...hindi , hindiId:hId}
    const newenglish ={...english , englishId:hEn}
    // console.log(hindi);
    // console.log(english);
    const booksdata = new Ebook({
        english: newenglish,
        hindi: newhindi
    })
    const result = await booksdata.save()
    console.log(result);

    res.status(201).json({msg:"created", result})
    // const ebooksData = req.body;
    //     try {
    //       const createdEbooks = [];
    //       const commonBookId = new mongoose.Types.ObjectId(); // Generate a common identifier
    //   let bookData
    //       for (const language in ebooksData) {
    //         const ebook = ebooksData[language];

    //         const { title, price, ebook_description, ebook_subtitle, pages, maxpage } = ebook;
    //         // const requiredFields = [title, price, ebook_description, ebook_subtitle, pages, maxpage];
    //         // if (requiredFields.some((field) => !field)) {
    //         //   console.error("addEbooks: Missing required fields for an ebook.");
    //         //   return res.status(400).json({ message: "All fields are required for each ebook." });
    //         // }
    //         // Creating a new Ebooks document with the common identifier
    //           bookData = new Ebook({
    //           title,
    //           price,
    //           ebook_description,
    //           ebook_subtitle,
    //           datecreated: new Date(),
    //           pages,
    //           maxpage,
    //           language,
    //           bookId: commonBookId,
    //         });
    //         createdEbooks.push(bookData);
    //     }
    //    const book= await bookData.save();
    //       return res.status(200).json({ status: 200, message: "Ebooks Created Successfully!", book });
    //     } catch (error) {
    //       console.log("Error in addEbooks:", error);
    //       return res.status(500).json({ error: "An error occurred", error: error.message });
    //     }



}

module.exports = ebookController

