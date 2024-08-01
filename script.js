const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const ctx = canvas.getContext("2d");

//Bu değişkenler, çizim boyutunu (size), farenin basılı olup olmadığını (isPressed), çizim rengini (color) ve farenin X ve Y koordinatlarını (x, y) tutar.
let size = 30;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;
//Bu olay, fareye basıldığında isPressed değişkenini true yapar ve farenin konumunu kaydeder.
canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});
//Bu olay, fare bırakıldığında isPressed değişkenini false yapar ve konumu sıfırlar.
canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});
//Bu olay, fare hareket ettikçe ve isPressed true olduğunda, fare konumuna göre daire çizer ve bir çizgi oluşturur.
canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});
//Bu fonksiyon, belirtilen koordinatlarda bir daire çizer.
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}
//Bu fonksiyon, iki nokta arasında bir çizgi çizer.
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}
//Bu olay, artırma düğmesine tıklanınca çizim boyutunu artırır (50'den büyük olamaz).
increaseBtn.addEventListener("click", () => {
  size += 5;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});
//Bu olay, azaltma düğmesine tıklanınca çizim boyutunu azaltır (5'ten küçük olamaz).
decreaseBtn.addEventListener("click", () => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
});
//Bu olay, renk seçim kutusunda bir renk seçildiğinde çizim rengini değiştirir.
colorEl.addEventListener("change", (e) => {
  color = e.target.value;
});
//Bu olay, temizleme düğmesine tıklanınca canvas'ı temizler.
clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
//Bu fonksiyon, mevcut çizim boyutunu ekranda günceller.
function updateSizeOnScreen() {
  sizeEl.innerText = size;
}
