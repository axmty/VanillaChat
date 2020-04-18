// Using classes and async/await.

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.roomUnsub;
  }

  async addChat(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      createdAt: firebase.firestore.Timestamp.fromDate(now)
    };

    return await this.chats.add(chat);
  }

  sync(callback) {
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
  }

  unsync() {
    this.roomUnsub?.();
  }

  updateName(username) {
    this.username = username;
  }

  updateRoom(room) {
    this.room = room;
    this.unsync();
  }
}