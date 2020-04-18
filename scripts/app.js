const chatList = document.querySelector('.chat-list');

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'alex');

chatroom.sync(data => chatUI.render(data));