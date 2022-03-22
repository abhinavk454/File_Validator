const request = require("supertest");
const app = require("../src/app");

//this should upload a dp
test("uploading valid dp", async () => {
  await request(app)
    .post("/uploadDP")
    .attach("dp", "./test/utils/profile_pic.png")
    .expect(200);
});

//this should not upload dp when size is greater than 300KB
test("Not uploading dp when size exceeds limit", async () => {
  const response = await request(app)
    .post("/uploadDP")
    .attach("dp", "./test/utils/profile_pic1.jpg")
    .expect(400);
  expect(response.body).toEqual({
    error: "File too large",
  });
});

//this should not upload dp when some other format is uploaded
test("Not uploading dp when other file formats rater than image are uploaded", async () => {
  const response = await request(app)
    .post("/uploadDP")
    .attach("dp", "./test/utils/report.docx")
    .expect(400);
  expect(response.body).toEqual({
    error: "Please upload a image file for display picture",
  });
});

//this should upload a resume
test("uploading valid dp", async () => {
  await request(app)
    .post("/uploadResume")
    .attach("resume", "./test/utils/resume.pdf")
    .expect(200);
});

//this should not upload resume when size is greater than 1MB
test("Not uploading resume when size exceeds limit", async () => {
  const response = await request(app)
    .post("/uploadResume")
    .attach("resume", "./test/utils/resume1.pdf")
    .expect(400);
  expect(response.body).toEqual({
    error: "File too large",
  });
});

//this should not upload resume when some other format is uploaded
test("Not uploading resume when other file formats rater than pdf are uploaded", async () => {
  const response = await request(app)
    .post("/uploadResume")
    .attach("resume", "./test/utils/report.docx")
    .expect(400);
  expect(response.body).toEqual({
    error: "Please upload a pdf file for resume",
  });
});

//this should upload a report document
test("uploading valid report", async () => {
  await request(app)
    .post("/uploadReport")
    .attach("report", "./test/utils/report.docx")
    .expect(200);
});

//this should not upload report when size is greater than 500KB
test("Not uploading when report size exceeds limit", async () => {
  const response = await request(app)
    .post("/uploadReport")
    .attach("report", "./test/utils/report1.docx")
    .expect(400);
  expect(response.body).toEqual({
    error: "File too large",
  });
});

//this should not upload report when some other format is uploaded
test("Not uploading when other file formats rater than word document are uploaded", async () => {
  const response = await request(app)
    .post("/uploadReport")
    .attach("report", "./test/utils/resume.pdf")
    .expect(400);
  expect(response.body).toEqual({
    error: "Please upload a word document file for report",
  });
});
