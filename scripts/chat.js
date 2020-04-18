function Chatroom(room, username) {
  this.room = room;
  this.username = username;
  this.chats = db.collection('chats');
  this.roomUnsub;
}

Chatroom.prototype.addChat = function (message) {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      createdAt: firebase.firestore.Timestamp.fromDate(now)
    };

    const response = this.chats.add(chat).then(() => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
};

Chatroom.prototype.sync = function (callback) {
  this.roomUnsub = this.chats
    .where('room', '==', this.room)
    .orderBy('createdAt')
    .onSnapshot(snap => {
      snap.docChanges().forEach(change => {
        if (change.type === 'added') {
          callback(change.doc.data());
        }
      });
    });
};

Chatroom.prototype.unsync = function () {
  this.roomUnsub?.();
};

Chatroom.prototype.updateName = function (username) {
  this.username = username;
};

Chatroom.prototype.updateRoom = function (room) {
  this.room = room;
  this.unsync();
};