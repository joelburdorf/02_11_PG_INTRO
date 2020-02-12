console.log('in JS');

$(document).ready(onReady);

function onReady() {
    $('#addSongButton').on('click', addSong);  
    getSongs();
} // end onReady

function addSong(){
    console.log('in addSong');
    //get user input in an object
    let objectToSend = {
        rank: $('#rankIn').val(),
        artist: $('#artistIn').val(),
        track: $('#trackIn').val(),
        published: $('#publishedIn').val()
    }
    //ajax call to the server to POST useer input
    $.ajax({
        type: 'POST',
        url: '/songs',
        data: objectToSend
    }).then(function (response){
        console.log('back from POST', response);
        getSongs();
        
    }).catch(function(err){
        alert('problem adding song');
        console.log(err); 
    })
}

function getSongs(){
    console.log('in GET getSongs');
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