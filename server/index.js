const express = require("express");
const http = require("http");
const cors = require("cors");
const PORT = 3040;
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const io = new Server(server, { cors: { origin: "*" }, pingTimeout: 5000 });
const MONGODB_URI =
  "mongodb+srv://W8PypVqIRJXDReMh:W8PypVqIRJXDReMh@cluster0.1nq2x.mongodb.net/socketTest?retryWrites=true&w=majority";

const routePat = require("./all/router");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("For Socket.IO");
});

app.use("/api", routePat);

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to Database");
});

const db = mongoose.connection;

db.on("open", () => {
  const observer = db.collection("users").watch();

  observer.on("change", (change) => {
    if (change.operationType === "insert") {
      const newData = {
        name: change.fullDocument.name,
        _id: change.fullDocument._id,
        like: change.fullDocument.like,
      };
      console.log(change.fullDocument);
      console.log(change);

      io.emit("newEntry", newData);
    }
  });
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconected");
  });
});

server.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});
