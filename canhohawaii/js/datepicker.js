
$(function () {
  $.fn.datetimepicker.defaults.format = 'YYYY-MM-DD';
  $.fn.datetimepicker.defaults.useCurrent = false;
  $.fn.datetimepicker.defaults.showClose = true;
  $.fn.datetimepicker.defaults.locale = 'vi';
  var from = $('#datetimepicker6').val() ? { maxDate: new Date($("#datetimepicker7").val()) } : null;
  var to = $('#datetimepicker7').val() ? { minDate: new Date($("#datetimepicker6").val()) } : null;
  $('#datetimepicker6').datetimepicker(from);
  $('#datetimepicker7').datetimepicker(to);
  $("#datetimepicker6").on("dp.change", function (e) {
    $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
  });
  $("#datetimepicker7").on("dp.change", function (e) {
    $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
  });
});