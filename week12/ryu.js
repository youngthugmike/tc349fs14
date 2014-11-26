function RyuAnimation() {
    $('#Ryu').html('<img src="http://i.imgur.com/90Mmdcm.png">')
    $('#Ryu img').hover(function () {
        this.src = 'http://i.imgur.com/nTj3Fxx.gif'
    }, function () {
        this.src = 'http://i.imgur.com/90Mmdcm.png'
    })
    $('#Ryu img').mousedown(function () {
        this.src = 'http://i.imgur.com/Rfj0a80.png'
    })
    $('#Ryu img').mousedown(function () {
        $('.hadouken').remove();
    })
    $('#Ryu img').mousedown(function () {
        $('#Ryu').append(
        '<img class="hadouken" src="http://i.imgur.com/oTyQRvX.gif" style="margin-bottom:100px">'
        );
    })
    $('#Ryu img').mousedown(function () {
        $('.hadouken').animate({
            "margin-left": "600px"
        }, 1000, 'swing', function () {
            this.remove();
        })
    })
    $('#Ryu img').mouseup(function () {
        this.src = 'http://i.imgur.com/90Mmdcm.png'
    })
}
$(document).ready(RyuAnimation);