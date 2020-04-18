function Chatroom(room, username) {
  this.room = room;
  this.username = username;
  this.chats = db.collection('chats');
}

Chatroom.prototype.addChat = function (message) {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const chatDocument = {
      message,
      username: this.username,
      room: this.room,
      createdAt: firebase.firestore.Timestamp.fromDate(now)
    };

    const response = this.chats.add(chatDocument);
    resolve(response);
  });
}

const chatroom = new Chatroom('gaming', 'alex');
chatroom.addChat('hello everyone')
  .then(() => console.log('chat added'))
  .catch(err => console.error(err));