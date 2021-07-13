/* global data */
/* exported data */

var $photoUrl = document.querySelector('#imgURL');
$photoUrl.addEventListener('input', handleImgUrl);
var $img = document.querySelector('img');

function handleImgUrl(event) {
  $img.setAttribute('src', event.target.value);
}

var $form = document.querySelector('.newEntry');
$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var newEntry = {
    title: $form.elements.title.value,
    imgUrl: $form.elements.imgURL.value,
    notes: $form.elements.notes.value
  };
  newEntry.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  $img.setAttribute('src', '');
  data.entries.unshift(newEntry);
  $form.reset();
}
