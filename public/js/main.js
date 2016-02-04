$(document).ready(function () {
  var removeButtons = document.querySelectorAll('button[name="remove"]');
  Array.prototype.forEach.call(removeButtons, function (button, i) {
    button.addEventListener('click', function () {
      var row = document.querySelector('#row' + i);
      row.parentNode.removeChild(row);
    });
  });

});
