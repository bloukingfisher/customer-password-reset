(function ($) {
  var getToken = function () {
    var params = location.search.substr(1).split("&");
    for (var i = 0; i < params.length; ++i) {
      var v = params[i];
      if ('t' === v.charAt(0) && '=' === v.charAt(1)) {
        v = v.substr(2).replace(/\/+/g, "");
        return decodeURIComponent(v);
      }
    }
    return null;
  };

  var changePassword = function (data) {
    var url = "https://api.spark.io/v1/password";
    $.post(url, data)
      .done(function () {
        messages.html("<p class='success'>Password successfully changed! Open the Keurig Connect app to login.</p>");
      })
      .fail(function (err) {
        console.log("API call failed: " + JSON.stringify(err));
        messages.html("<p>Sorry, something went wrong. Please try again. If you continue to see this message please contact customer support.</p>");
      });
  };

  var validateFields = function () {
    var e = $("#email").val();
    var p1 = $("#pass1").val();
    var p2 = $("#pass2").val();

    // from http://www.regular-expressions.info/email.html
    var looksLikeEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(e);
    var passwordsMatch = p1 === p2;
    var passwordLongEnough = p1.length >= 8;
    if (looksLikeEmail && passwordsMatch && passwordLongEnough) {
      var data = { token: token, email: e, password: p1 };
      changePassword(data);
    } else {
      messages.html("");
      if (!looksLikeEmail)
        messages.append("<p>Invalid email address.</p>");
      if (!passwordsMatch)
        messages.append("<p>Passwords don't match.</p>");
      if (!passwordLongEnough)
        messages.append("<p>Password must be at least 8 characters.</p>");
    }
  };

  $("#submit").on("click", validateFields);
  $("#fields").on("keyup", function (e) {
    // catch enter key
    if (13 === e.keyCode) {
      $("#submit").click();
    }
  });
  var messages = $("#messages");
  var token = getToken();
  if (token) {
    $("#fields").show();
    $("#email").focus();
  } else {
    messages.html("<p>Sorry, it doesn't look like you arrived here from a password reset email.</p>");
  }
})(jQuery);
