$(document).ready(() => {
  $(".datepicker").datepicker({
    changeMonth: true,
    changeYear: true,
    yearRange: "1950:2005",
    dateFormat: "mm/dd/yy",
  });

  $("#phone").mask("(000) 000-0000", { placeholder: "(___) ___-____" });

  $("#jobForm").validate({
    rules: {
      firstName: "required",
      lastName: "required",
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        minlength: 14,
      },
      position: "required",
      birthdate: "required",
    },
    messages: {
      firstName: "Lütfen adınızı giriniz",
      lastName: "Lütfen soyadınızı giriniz",
      email: {
        required: "Lütfen e-posta adresinizi giriniz",
        email: "Lütfen geçerli bir e-posta adresi giriniz",
      },
      phone: {
        required: "Lütfen telefon numaranızı giriniz",
        minlength: "Lütfen telefon numaranızı tam giriniz",
      },
      position: "Lütfen bir pozisyon seçiniz",
      birthdate: "Lütfen doğum tarihinizi seçiniz",
    },
    submitHandler: (form) => {
      $(document).clearQueue();
      $(document)
        .queue(function (next) {
          $("#applicationForm").fadeOut(400);
          next();
        })
        .delay(400)
        .queue(function (next) {
          $("#successMessage").fadeIn(400);
          next();
        })
        .delay(3000)
        .queue(function (next) {
          $("#successMessage").fadeOut(400);
          next();
        })
        .queue(function () {
          form.reset();
          $(document).dequeue();
        });
    },
  });

  $("#applyBtn").click(() => {
    $("#applicationForm").fadeIn(400);
  });

  $("#closeBtn").click(() => {
    $("#applicationForm").fadeOut(400);
  });
});
