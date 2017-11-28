$(document).ready(function(){
    /* Create an array with the values of all the checkboxes in a column */
    $.fn.dataTable.ext.order['dom-checkbox'] = function  ( settings, col )
    {
        return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
            return $('input', td).prop('checked') ? '1' : '0';
        } );
    };
	$('input[type=checkbox]').bootstrapSwitch();
    $('table').DataTable( {
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Vietnamese.json"
        },
        "aaSorting": [],
        "bFilter": false,
        "columns": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            { "orderDataType": "dom-checkbox" },
            { "orderDataType": "dom-checkbox" },
            null,
            null,
            null
        ]
    } );
    $('.contact span.bootstrap-switch-label, .contact span.bootstrap-switch-primary, .contact span.bootstrap-switch-default').on("click", function(){
      var checkbox = $(this).nextAll('input[type=checkbox]');
      if ($(checkbox).is(':checked')) {
        $.post( "ajax/contact", { id: $(checkbox).data("id"), contact_status: 1 } );
      }else{
        $.post( "ajax/contact", { id: $(checkbox).data("id"), contact_status: 0 } );
      }
    });
    $('.participate span.bootstrap-switch-label, .participate span.bootstrap-switch-primary, .participate span.bootstrap-switch-default').on("click", function(){
      var checkbox = $(this).nextAll('input[type=checkbox]');
      if ($(checkbox).is(':checked')) {
        $.post( "ajax/participate", { id: $(checkbox).data("id"), participate_status: 1 } );
      }else{
        $.post( "ajax/participate", { id: $(checkbox).data("id"), participate_status: 0 } );
      }
    });
    $('.clear').on("click", function(){
      $('input[type=text][name*=search]').val('');
      $('select[name*=search]').val('');
      $('input[type=text][name*=search]').prop("disabled", true);
      $('select[name*=search]').prop("disabled", true);
      $('form').submit();
    });
    
    $('.note').on("click", function(){
      $("#save_note").data("item", "note");
      $("#save_note").data("id", $(this).data("id"));
      $("#note").val($("#note_" + $(this).data("id")+" span").html().replace(/<br>/g, "\r"));
    });
    $('.sales_note').on("click", function(){
      $("#save_note").data("item", "sales_note");
      $("#save_note").data("id", $(this).data("id"));
      $("#note").val($("#sales_note_" + $(this).data("id")+" span").html().replace(/<br>/g, "\r"));
    });
    $('#save_note').on("click", function(){
      if ($(this).data("item") === "note") {
        $.post( "ajax/note", { id: $(this).data("id"), note: $("#note").val() } );
        $("#note_" + $(this).data("id")+" span").html($("#note").val().replace(/\r|\r\n|\n\r|\n/g, "<br/>"));
      }else{
        $.post( "ajax/sales_note", { id: $(this).data("id"), sales_note: $("#note").val() } );
        $("#sales_note_" + $(this).data("id")+" span").html($("#note").val().replace(/\r|\r\n|\n\r|\n/g, "<br/>"));
      }
      $("#note").val("");
    });
});