const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const defaultName = 'anon';
const defaultRoom = 'general';

newChatForm.addEventListener('submit', e => {
  e.preventDefault();

  const newMessage = newChatForm.message.value.trim();
  chatroom.addChat(newMessage)
    .then(() => newChatForm.reset())
    .catch(err => console.error(err));
});

newNameForm.addEventListener('submit', e => {
  e.preventDefault();

  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  newNameForm.reset();
  localStorage.name = newName;
});

const name = localStorage.name ?? defaultName;
const room = localStorage.room ?? defaultRoom;

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(room, name);

chatroom.sync(data => chatUI.render(data));