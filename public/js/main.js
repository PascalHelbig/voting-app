var lastIndex = -1;
$(document).ready(function () {
  var removeButtons = document.querySelectorAll('#answers button[name="remove"]');
  lastIndex = removeButtons.length - 1;
  Array.prototype.forEach.call(removeButtons, addRemoveListener);

  document.querySelector('#addAnswer').addEventListener('click', function () {
    var template = document.querySelector('#answerTemplate > div').cloneNode(true);
    template.id = "row" + ++lastIndex;
    addRemoveListener(template.querySelector('button'), lastIndex);
    document.getElementById('answers').appendChild(template);
  });

  function addRemoveListener(button, i) {
    button.addEventListener('click', function () {
      var row = document.querySelector('#row' + i);
      row.parentNode.removeChild(row);
    });
  }
});
