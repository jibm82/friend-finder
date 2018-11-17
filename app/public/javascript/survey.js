$(document).ready(() => {
  $("#survey-form").on("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
      let form = $(this);
      let url = form.attr("action");

      $.post(url, formData(form), (res) => {
        let friend = res.friend;
        swal({
          title: 'Your best match is',
          text: friend.name,
          imageUrl: friend.photo,
          imageAlt: friend.name,
          animation: false
        });
      });
    } else {
      swal({
        title: 'Error!',
        text: 'You need to fill out all the fields in order to submit',
        type: 'error',
        confirmButtonText: 'Ok'
      })
    }
  });

  function formData(form) {
    let formData = { scores: [] };

    form.serializeArray().map((field) => {
      if (field["name"] === "scores[]") {
        formData.scores.push(field["value"]);
      } else {
        formData[field["name"]] = field["value"];
      }
    });

    return formData;
  }

  function validateForm() {
    return $(".form-control").toArray().every((field) => {
      return $(field).val().trim() !== ""
    });
  }
});