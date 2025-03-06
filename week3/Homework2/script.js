$(document).ready(() => {
  $(".listProducts").on("click", () => {
    $.ajax({
      url: "dummy.json",
      type: "GET",
      dataType: "json",
      success: (data) => {
        displayProducts(data.products);
      },
      error: (xhr, status, error) => {
        alert(`Bir hata oluştu: ${error}`);
      },
      complete: (xhr, status) => {
        console.log("Request tamamlandı.");
      },
    });
  });

  const displayProducts =(products) => {
    const $productContainer = $(".productContainer");
    const $container = $(".container");
    $container.find('h1').remove();
    const $h1 = $("<h1>").text("Ürünler");
    
    $productContainer.empty();
    $container.prepend($h1);

    products.forEach((product) => {
      let productCard = `
                <div class="product-card">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price} TL</div>
                    <a href="${product.link}" class="product-link" target="_blank">Ürünü gör</a>
                </div>
            `;
      $productContainer.append(productCard);
    });

    $(".container").hide().fadeIn(500);
  }
});
