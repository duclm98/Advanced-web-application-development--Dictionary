$('#frTextArea').keyup(function () {
  const frWord = $("#frTextArea").val();
  $.ajax({
    url: `http://localhost:3000/api/fr-en?word=${frWord}`,
    type: 'GET',
    dataType: 'json',
    timeout: 10000
  }).done(function (data) {
    if (!data) {
      return $('#viTextArea').text(frWord);
    }
    const enWord = data.result;
    $.ajax({
      url: `http://localhost:3001/api/en-vi?word=${enWord}`,
      type: 'GET',
      dataType: 'json',
      timeout: 10000
    }).done(function (data1) {
      if (!data1) {
        return $('#viTextArea').text(frWord);
      }
      const viWord = data1.result;
      return $('#viTextArea').text(viWord);
    }).fail(function (jqXHR, textStatus, error) {
      return $('#viTextArea').text(frWord);
    });
  }).fail(function (jqXHR, textStatus, error) {
    return $('#viTextArea').text(frWord);
  });
});