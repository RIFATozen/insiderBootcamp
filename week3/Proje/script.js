$(document).ready(() => {
  const $header = $("<header>");
  const $h1 = $("<h1>").text("Ürünler");
  $header.append($h1);

  const $main = $("<main>");
  const $productGrid = $("<div>").addClass("product-grid");
  $main.append($productGrid);

  $("body").append($header, $main);

  const $overlay = $("<div>").addClass("overlay");
  const $modal = $("<div>").addClass("modal");
  const $closeBtn = $("<button>").html("&times;");

  $overlay.css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    "background-color": "rgba(0, 0, 0, 0.7)",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "z-index": 1000,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
  });

  $modal.css({
    "background-color": "white",
    padding: "30px",
    "border-radius": "10px",
    "max-width": "600px",
    width: "90%",
    position: "relative",
    transform: "scale(0.8)",
    transition: "transform 0.3s ease",
  });

  $closeBtn.css({
    position: "absolute",
    top: "10px",
    right: "15px",
    border: "none",
    background: "none",
    "font-size": "24px",
    cursor: "pointer",
    padding: "0",
    "line-height": "1",
    color: "#333",
    "z-index": 10,
  });

  $modal.append($closeBtn);
  $overlay.append($modal);
  $("body").append($overlay);

  $(document).on("click", ".overlay button", function () {
    closeModal();
  });

  $overlay.on("click", function (e) {
    if ($(e.target).hasClass("overlay")) {
      closeModal();
    }
  });

  $.ajax({
    url: "dummy.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      loadProducts(data.products);
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
      $main.append(
        $("<p>")
          .text("Ürünler yüklenemedi. Lütfen daha sonra tekrar deneyin.")
          .css({
            "text-align": "center",
            color: "red",
            margin: "20px 0",
          })
      );
    },
  });

  function loadProducts(products) {
    $.each(products, function (i, product) {
      const $productCard = $("<div>").addClass("product-card").css({
        padding: "20px",
        "min-height": "120px",
        "background-color": "white",
        "border-radius": "8px",
        "box-shadow": "0 2px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      });

      $productCard.hover(
        function () {
          $(this).css({
            transform: "translateY(-5px)",
            "box-shadow": "0 10px 20px rgba(0, 0, 0, 0.15)",
          });
        },
        function () {
          $(this).css({
            transform: "translateY(0)",
            "box-shadow": "0 2px 10px rgba(0, 0, 0, 0.1)",
          });
        }
      );

      const $productContent = $("<div>").css({
        padding: "10px 0",
      });

      const $productName = $("<h2>").text(product.name).css({
        margin: "0 0 10px 0",
        "font-size": "18px",
        color: "#333",
      });

      const $productPrice = $("<p>").text(`${product.price} TL`).css({
        margin: "0",
        color: "#e44d26",
        "font-weight": "bold",
        "font-size": "16px",
      });

      $productContent.append($productName, $productPrice);
      $productCard.append($productContent);

      $productCard.on("click", function () {
        showProductDetails(product);
      });

      $productCard.css("opacity", 0);
      $productGrid.append($productCard);
      $productCard.animate({ opacity: 1 }, 500);
    });
  }

  function showProductDetails(product) {
    $modal.empty().append($closeBtn);

    const $modalContent = $("<div>").css({
      display: "flex",
      "flex-direction": "column",
      gap: "15px",
    });

    const $productName = $("<h2>").text(product.name).css({
      margin: "0",
      color: "#333",
    });

    const $productPrice = $("<p>").text(`${product.price} TL`).css({
      margin: "0",
      color: "#e44d26",
      "font-weight": "bold",
      "font-size": "18px",
    });

    const $productDetails = $("<p>").text(product.description).css({
      margin: "0",
      "line-height": "1.6",
    });

    const $productLink = $("<a>")
      .attr({
        href: product.link,
        target: "_blank",
      })
      .text("Ürünü İncele")
      .css({
        display: "inline-block",
        "margin-top": "10px",
        padding: "10px 15px",
        "background-color": "#333",
        color: "white",
        "text-decoration": "none",
        "border-radius": "5px",
        transition: "background-color 0.3s ease",
      });

    $productLink.hover(
      function () {
        $(this).css("background-color", "#444");
      },
      function () {
        $(this).css("background-color", "#333");
      }
    );

    $modalContent.append(
      $productName,
      $productPrice,
      $productDetails,
      $productLink
    );
    $modal.append($modalContent);

    $overlay.css({
      visibility: "visible",
      opacity: "1",
    });
    $modal.css("transform", "scale(1)");
  }

  function closeModal() {
    $overlay.css({
      opacity: "0",
      visibility: "hidden",
    });
    $modal.css("transform", "scale(0.8)");
  }
});
