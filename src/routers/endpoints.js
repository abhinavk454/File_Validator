const express = require("express");
const multer = require("multer");

const appRouter = new express.Router();

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// UploadDP route
appRouter.post("/uploadDP", (req, res) => {
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 300 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        return cb(new Error("Please upload a image file for display picture"));
      }
      cb(null, true);
    },
  }).single("dp");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: "File too large" });
      res.end();
    } else if (err) {
      res
        .status(400)
        .json({ error: "Please upload a image file for display picture" });
      res.end();
    } else {
      res.status(200).json({ message: "Success" });
    }
  });
});

// UploadReport route
appRouter.post("/uploadReport", (req, res) => {
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 500 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype !== "application/msword" &&
        file.mimetype !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return cb(new Error(``));
      }
      cb(null, true);
    },
  }).single("report");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: "File too large" });
    } else if (err) {
      res
        .status(400)
        .json({ error: "Please upload a word document file for report" });
    } else {
      res.status(200).json({ message: "Success" });
    }
  });
});

// UploadResume route
appRouter.post("/uploadResume", (req, res) => {
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== "application/pdf") {
        return cb(new Error(``));
      }
      cb(null, true);
    },
  }).single("resume");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ error: "File too large" });
    } else if (err) {
      res.status(400).json({ error: "Please upload a pdf file for resume" });
    } else {
      res.status(200).json({ message: "Success" });
    }
  });
});

appRouter.get("/", (req, res, next) => {
  res.send(
    "Hey thanks for visiting API routes are /uploadDP, /uploadResume and /uploadReport ."
  );
});

module.exports = appRouter;
