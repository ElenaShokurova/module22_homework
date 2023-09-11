const clientWindow = document.querySelector('#clientWindow');
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');
const height = window.screen.height;
const width = window.screen.width;

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.href = `https://yandex.ru/maps/10819/tver-oblast/house/novaya_ulitsa_7/Z08YfgdpQEEFQFtsfXp3cXRrbA==/?ll=36.811845%2C56.661344&utm_source=ntp_chrome&z=17.48`
  mapLink.textContent = 'Ссылка на карту';
}

btn.addEventListener('click', () => {
  clientWindow.textContent = `Высота экрана ${width}px, ширина экрана ${height}px`;
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
