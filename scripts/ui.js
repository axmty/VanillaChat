function ChatUI(list) {
  this.list = list;
}

ChatUI.prototype.render = function (data) {
  const when = dateFns.distanceInWordsToNow(
    data.createdAt.toDate(),
    { addSuffix: true }
  );
  const html = `
    <li class="list-group-item">
      <span class="username">${data.username}</span>
      <span class="message">${data.message}</span>
      <div class="time">${when}</div>
    </li>`;

  this.list.innerHTML += html;
};

ChatUI.prototype.clear = function () {
  this.list.innerHTML = '';
};