console.log('in JS');

$(document).ready(onReady);

function onReady() {
    $('#addSongButton').on('click', addSong); 
    $('#songList').on('click', '.delete', deleteSongs);   
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
    }) //end ajax
} //end addBooks
function getSongs(){
    console.log('in GET getSongs');
    //make ajax request to GET songs from server
    $.ajax({
        type: 'GET',
        url: '/songs'
    }).then(function(response){
        console.log('back from GET with ', response);
        displaySongs(response);
    }).catch (function (err){
        console.log( err);
        alert ('no worky');
    })
}
function displaySongs(responseArray){
//loop through array
$('#songList').empty()
for (let i=0; i<responseArray.length; i++){
    //append each song to DOM
    $('#songList').append(`
   <li data-id="${responseArray[i].id}">(${responseArray[i].id})${responseArray[i].artist} : ${responseArray[i].track} 
   <button class="delete">Delete</button></li>`);
    }   
}
function deleteSongs(){
    console.log('in deleteSongs');
    let selectedId = $(this).parent().data('id');
    console.log('this is the ID selected to delete', selectedId);
    $.ajax({
        type: 'DELETE',
        url: `/songs/${selectedId}`
    }).then(function (response) {
        console.log('response back from DELETE', response);
        getSongs();
    }).catch(function (err) {
        console.log(err);
        alert('no worky');
    })
}
