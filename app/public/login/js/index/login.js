$(function() {
    dpd.users.me(function(result) {
        result && (window.location.href = '/board');
    });
    var usernameField = $('#login-username'),
            passwordField = $('#login-password'),
            loginForm = $('#login-form');
    $('form').on('submit', function(evt) {
        evt.preventDefault();
        dpd.users.login({
            username: usernameField.val(),
            password: passwordField.val()
        }, function(result) {
            if (!result) {
                loginForm.hasClass('shake') && loginForm.removeClass('shake');
                loginForm[0].offsetHeight; //reflow
                loginForm.addClass('animated');
                loginForm.addClass('shake');
            } else {
                window.location.href = '/';
            }
        });
    });
});
  