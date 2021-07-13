/* global data */
/* exported data */

var $photoUrl = document.querySelector('#imgURL');
var $img = document.querySelector('img');
var $form = document.querySelector('.newEntry');
var $newEntryView = document.querySelector('.new-button');
var $navEntries = document.querySelector('.nav-entries');
var $views = document.querySelectorAll('.view');

$photoUrl.addEventListener('input', handleImgUrl);
$form.addEventListener('submit', handleSubmit);
$newEntryView.addEventListener('click', showNewForm);
$navEntries.addEventListener('click', showEntries);

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

  showEntries(event);
  $form.reset();
}

function showNewForm(event) {
  $views.forEach(node => {
    if (node.getAttribute('data-view') === 'entry-form') {
      node.className = 'view';
    } else {
      node.className = 'view hidden';
    }
  });
  data.view = 'entry-form';
}

function showEntries(event) {
  $views.forEach(node => {
    if (node.getAttribute('data-view') === 'entries') {
      node.className = 'view';
    } else {
      node.className = 'view hidden';
    }
  });
  data.view = 'entries';
}
