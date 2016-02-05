function hashCode(str) { // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return "#" + "00000".substring(0, 6 - c.length) + c;
}

var answers = JSON.parse(document.getElementById('pollAnswers').innerText);
answers = answers.map(function (answer) {
  return {
    label: answer.title,
    value: answer.votes,
    color: intToRGB(hashCode(answer.title))
  }
});
console.log(answers);
var ctx = document.getElementById('pollChart').getContext("2d");
new Chart(ctx).Pie(answers);
