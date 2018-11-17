$(document).ready(() => {
  $("#survey-form").on("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
      let form = $(this);
      let url = form.attr("action");

      $.post(url, formData(form), (res) => {
        let friend = res.friend;

        if (friend !== undefined) {
          displayFriend(friend);
        } else {
          displayNoMatch();
        }
        $(".form-control").val("");
      }).fail((err) => {
        displayError(err);
      });
    } else {
      swal({
        title: "Error!",
        text: "You need to fill out all the fields in order to submit",
        type: "error",
        confirmButtonText: "Ok"
      })
    }
  });

  function validateForm() {
    return $(".form-control").toArray().every((field) => {
      return $(field).val().trim() !== ""
    });
  }

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

  function displayNoMatch() {
    swal({
      title: "No matches found",
      text: "There are no matches",
      type: "Error"
    });
  }

  function displayFriend(friend) {
    swal({
      title: "Your best match is",
      text: friend.name,
      imageUrl: friend.photo,
      imageAlt: friend.name,
      animation: false
    });
  }

  function displayError(errorMessage) {
    swal({
      title: "Error",
      text: errorMessage,
      type: "Error"
    });
  }
});