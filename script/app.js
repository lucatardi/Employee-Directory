$(document).ready( () => {
  var randomUserGeneratorAPI = 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob';
  var callback = function(result) {
    var userList = result.results; // to get into user list

    $.each(userList, (item, value) => {

      const imageURL = value.picture.medium;
      const name = value.name.first + " " + value.name.last;
      const email = value.email;
      const city = value.location.city;
      const phone = value.phone;
      const address = value.location.street;
      const birthday = value.dob;

      var html = "<div class='contact'>";
      html += " <img src='" + imageURL + "' alt='Avatar "+ name +"'>";
      html += " <div class='data'>";
      html += "   <h2 class='name'> " + name + " </h2>";
      html += "   <p class='email'> " + email + " </p>";
      html += "   <p class='city'> " + city + " </p>";

      html += "   <p class='hide'> " + phone + " </p>";
      html += "   <p class='hide'> " + address + " </p>";
      html += "   <p class='hide'> " + birthday + " </p>";

      html +=  "  </div> <!-- Data -->";
      html +=  "</div> <!-- Contact -->";

      $(".table").append(html);
    });
  }
  $.getJSON( randomUserGeneratorAPI, callback );




// event listener

  $(".table").on("click", function(event) {
      if(event.target.className === "contact") {
        var contactTarget = event.target;
      } else if ($(event.target).parents('.contact').length > 0) {
        var contactTarget = $(event.target).parents(".contact")[0];
      }

      if (contactTarget) {
        console.log(contactTarget);
        $(".overlay").css("display", "block");

        const htmlName = $(contactTarget).children().children()[0];
        const htmlMail = $(contactTarget).children().children()[1];
        const htmlCity = $(contactTarget).children().children()[2];
        const htmlPhone = $(contactTarget).children().children()[3];
        const htmlAddress = $(contactTarget).children().children()[4];
        const htmlBirthday = $(contactTarget).children().children()[5];

        $("#img_showed").attr("src",$(contactTarget).children().attr("src"));
        $("#name_showed").html($(htmlName).html());
        $("#email_showed").html($(htmlMail).html());
        $("#city_showed").html($(htmlCity).html());

        $("#phone_showed").html($(htmlPhone).html());
        $("#address_showed").html($(htmlAddress).html());
        $("#birthday_showed").html($(htmlBirthday).html().split(" ")[1]);
      }

  });

  $(".button__close").click( function () {
    $(".overlay").css("display", "none");
  });


});
