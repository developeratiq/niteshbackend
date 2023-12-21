const mongoose  =require('mongoose')


const pageSchema = new mongoose.Schema({
  pageTitle: String,
  pageContent: String,
  pageSubtitle_1: String,
  pageSubtitle_2: String,
  pageSubtitle_3: String,
  pageSubtitle_4: String,
});

const ebookSchema = new mongoose.Schema({
  // _id: String,
 hindi:{
  hindiId:String,
  ebook_image: String,
  language: [String],
  title: String,
  ebook_subtitle: String,
  ebook_description: String,
  price: String,
  pages: [pageSchema],
  maxpage: Number,
  bookId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
 }, english:{
  englishId:String,
  ebook_image: String,
  language: [String],
  title: String,
  ebook_subtitle: String,
  ebook_description: String,
  price: String,
  pages: [pageSchema],
  maxpage: Number,
  bookId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
 }
});

const Ebook = mongoose.model('Ebook', ebookSchema);

module.exports = Ebook;
