console.log('in JS');

$(document).ready(onReady);

function onReady() {
    console.log('in onReady')
    getSongs();

} // end onReady


function getSongs(){
    //make ajax request to GET songs from server
    $.ajax({
        type: 'GET',
        url: '/songs'
    }).then(function(response){

        console.log('back from GET with ', response);
    }).catch (function (err){
        console.log( err);
        alert ('no worky');
    })
}