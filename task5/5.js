const wsUri = "wss://echo-ws-service.herokuapp.com/";

const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');
const input = document.querySelector('.input');
const status = document.querySelector('#status');
const btnGeo = document.querySelector('.j-btn-geo');

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

btnOpen.addEventListener('click', () => {
  btnOpen.style.display = "none";
  btnGeo.style.display = "inline-block";
  btnClose.style.display = "inline-block";
  btnSend.style.display = "inline-block";
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
  };
  websocket.onclose = function(evt) {
    writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">Сервер: ' + evt.data+'</span>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">Ошибка:</span> ' + evt.data
    );
  };
});

btnClose.addEventListener('click', () => {
  btnOpen.style.display = "inline-block";
  btnGeo.style.display = "none";
  btnClose.style.display = "none";
  btnSend.style.display = "none";
  output.innerHTML = "";
  websocket.close();
  websocket = null;
});

btnSend.addEventListener('click', () => {
  const message = input.value;
  writeToScreen("Клиент: " + message);
  websocket.send(message);
});

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  const message = '<a href=' +    `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}` + '>Ссылка на карту</a>';
  writeToScreen(message);
}

btnGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});