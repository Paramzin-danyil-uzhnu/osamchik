var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');
var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Зациклювання зображень */
for (let i = 1; i <= 5; i++) {
    var newImage = document.createElement('img');
    newImage.setAttribute('src', `images/pic${i}.jpg`);
    thumbBar.appendChild(newImage);

    // Додаємо обробник подій для кожного мініатюрного зображення
    newImage.addEventListener('click', function (e) {
        var imgSrc = e.target.getAttribute('src');
        displayedImage.setAttribute('src', imgSrc);
    });
}

/* Обробник подій для кнопки затемнення */
btn.addEventListener('click', function () {
    var btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darker';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
});
