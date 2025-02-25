// Kullanıcı bilgilerini alma
const user = {
    name: prompt("Lütfen adınızı giriniz:"),
    age: prompt("Lütfen yaşınızı giriniz:"),
    job: prompt("Lütfen mesleğinizi giriniz:")
};

// Kullanıcı bilgilerini gösterme
document.getElementById('userInfo').innerHTML = `
    <h2>Kullanıcı Bilgileri</h2>
    <p>İsim: ${user.name}</p>
    <p>Yaş: ${user.age}</p>
    <p>Meslek: ${user.job}</p>
`;

// Alışveriş sepeti
let basket = [];

// Ürün ekleme fonksiyonu
function addProduct() {
    const name = prompt("Ürün adını giriniz:");
    const price = parseFloat(prompt("Ürün fiyatını giriniz(₺):"));
    
    if (name && !isNaN(price)) {
        basket.push({ name, price });
        updateBasket();
    } else {
        alert("Lütfen geçerli bir ürün bilgisi girin!");
    }
}

// Ürün kaldırma fonksiyonu
function removeProduct(index) {
    basket.splice(index, 1);
    updateBasket();
}

// Toplam fiyatı hesaplama fonksiyonu
function calculateTotal() {
    return basket.reduce((total, product) => total + product.price, 0);
}

// Sepet bilgilerini güncelleme fonksiyonu
function updateBasket() {
    const basketList = document.getElementById('basketList');
    basketList.innerHTML = `
        <h2>Alışveriş Sepeti</h2>
        <ul>
            ${basket.map((product, index) => `
                <li>
                    ${product.name} - ${product.price.toFixed(2)} ₺
                    <button onclick="removeProduct(${index})">Ürünü sil</button>
                </li>
            `).join('')}
        </ul>
    `;
    
    document.getElementById('totalPrice').innerHTML = `
        <h3>Toplam Ücret: ${calculateTotal().toFixed(2)} ₺</h3>
    `;
}