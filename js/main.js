/* global data */
/* exported data */

var $photoUrl = document.querySelector('#imgURL');
var $img = document.querySelector('img');
var $form = document.querySelector('.newEntry');

$photoUrl.addEventListener('input', handleImgUrl);
$form.addEventListener('submit', handleSubmit);

function handleImgUrl(event) {
  $img.setAttribute('src', event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  var newEntry = {
    title: $form.elements.title.value,
    imgUrl: $form.elements.imgURL.value,
    notes: $form.elements.notes.value
  };
  newEntry.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
}
