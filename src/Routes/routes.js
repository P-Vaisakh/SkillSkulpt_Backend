const express = require("express");

const upload = require("../Middlewares/multerMiddleware");

const { jwtMiddleware } = require("../Middlewares/jwtMiddleware");

const users = require("../Controllers/userControls");
const requests = require("../Controllers/requestControls");
const reviews = require("../Controllers/reviewControls");
const appReviews = require("../Controllers/appReviewControls");
const chat = require("../Controllers/chatControls");
const message = require("../Controllers/messagecontrollers");

const router = express.Router();

router.post("/users/signup", users.signupUser);
router.post("/users/login", users.loginUser);
router.put(
  "/users/editProfile/:_id",
  jwtMiddleware,
  upload.single("profilePic"),
  users.editProfile
);
router.get("/users/:id", users.getUser);
router.patch("/users/updateRating/:id", jwtMiddleware, users.updateRating);


router.post("/requests/postRequest", jwtMiddleware, requests.postRequest);
router.get("/requests", requests.getPosts);
router.get("/requests/userRequests/:_id", requests.getUserRequests);
router.delete(
  "/requests/deleteRequest/:_id",
  jwtMiddleware,
  requests.deleteRequest
);


router.post("/reviews/postReview", jwtMiddleware, reviews.postReview);
router.get("/reviews/:id", reviews.getReviews);


router.post(
  "/appReviews/postAppReview/:id",
  jwtMiddleware,
  appReviews.postAppReview
);
router.get("/appReviews", appReviews.getAppReviews);


router.post("/chats", jwtMiddleware, chat.createChat);
router.get("/chats/:id", jwtMiddleware, chat.getUserChats);
router.get("/chats/:fid/:sid", jwtMiddleware, chat.findChat);


router.post("/messages", jwtMiddleware, message.postMessage);
router.get("/messages/:id", jwtMiddleware, message.getMessages);

module.exports = router;
