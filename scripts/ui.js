function ChatUI(list) {
  this.list = list;
}

ChatUI.prototype.render = function (data) {
  const html = `
    <li class="list-group-item">
      <span class="username">${data.username}</span>
      <span class="message">${data.message}</span>
      <div class="time">${data.createdAt.toDate()}</div>
    </li>`;

  this.list.innerHTML += html;
};