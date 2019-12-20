const express = require("express");

function routes(Book) {
  const booksRouter = express.Router();
  booksRouter.use("/books/:bookId", (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  booksRouter
    .route("/books")
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      return res.status(201).json(book);
    })
    .get((req, res) => {
      Book.find((err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });

  booksRouter
    .route("/books/:bookId")
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save();
      return res.json(book);
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if(err){
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return booksRouter;
}

module.exports = routes;
