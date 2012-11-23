/* this is the color picker */
$(".palette").click(function(e){
    $("#" + color).css("opacity", "0.7");
    color = $(this).attr("id");
    $(this).css('opacity', '1');
});