# Debugger Kullanarak Hata Ayıklama Süreci

## 1. `addItem` Fonksiyonunda:
```javascript
if (product.stock <= quantity) { // < yerine <= kullanıldı
    throw new Error('Yetersiz stok!');
}
```
- İlk debugger noktasında ürünün ve stok bilgisinin kontrolü yapılıyor
- **Hata:** Stok kontrolünde `<=` kullanılmış, yani ürün stoku tam olarak istenen miktar kadarsa bile "Yetersiz stok" hatası verilecek
- **Doğru şekli:** `<` olmalı ki, eşit miktarda stok varsa ürün eklenebilsin

## 2. `removeItem` Fonksiyonunda:
```javascript
const product = products.find(p => p.id === productId);
debugger; // Ürünün bulunup bulunmadığı ve mevcut stok bilgisi kontrol edilmeli.
if (product) {
    product.stock += 1; // item.quantity yerine sabit değer
}
```
- Debug noktasında item ve stok bilgilerini incelediğimizde:
- **Hata:** Stok güncellemesi sabit 1 değeriyle yapılıyor, kaldırılan ürünün gerçek miktarı (`item.quantity`) yerine
- **Doğrusu:** `product.stock += item.quantity;` olmalı

## 3. `calculateTotal` Fonksiyonunda:
```javascript
this.total = this.items.reduce((sum, item) => {
    debugger; // Her item için sum, item.price, item.quantity değerleri kontrol edilmeli.
    return sum + item.price; // quantity çarpımı unutuldu
}, 0);
```
- Debug noktasında sum, item.price ve item.quantity değerlerini incelediğimizde:
- **Hata:** Toplam hesaplanırken ürün miktarı (quantity) çarpımı unutulmuş
- **Doğrusu:** `return sum + (item.price * item.quantity);` olmalı

## 4. `applyDiscount` Fonksiyonunda:
```javascript
if (this.discountApplied && this.total > 0) {
    this.total *= 0.1;
}
```
- applyDiscount fonksiyonunda debug noktasına geldiğimizde:
- **Hata:** İndirim uygulanırken toplam fiyat `0.1` ile çarpılıyor, bu %90 indirim anlamına gelir
- **Doğrusu:** %10 indirim için `this.total *= 0.9;` olmalı (veya `this.total = this.total * 0.9;`)

## 5. UI Güncellemeleri:
```javascript
updateUI() {
    const cartElement = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    
    if (cartElement && totalElement) {
        debugger; // UI elemanlarının doğru seçilip seçilmediği kontrol edilmeli.
        // ...
    }
}
```
- Debug noktasında UI elemanlarını kontrol ettiğimizde:
- **Hata:** Sepet öğelerinde fiyat gösterilirken birim fiyat * adet çarpımı yapılmıyor, sadece birim fiyat gösteriliyor
- **Doğrusu:** Toplam fiyat gösterilirken `${item.price * item.quantity} TL` şeklinde olmalı