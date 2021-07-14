/* global data */
/* exported data */

var $photoUrl = document.querySelector('#imgURL');
var $img = document.querySelector('img');
var $form = document.querySelector('.newEntry');
var $newEntryView = document.querySelector('.new-button');
var $navEntries = document.querySelector('.nav-entries');
var $views = document.querySelectorAll('.view');
var $journal = document.querySelector('.journal-entries');
var $noEntries = document.querySelector('.no-entries');

$photoUrl.addEventListener('input', handleImgURL);
$form.addEventListener('submit', handleSubmit);
$newEntryView.addEventListener('click', showNewForm);
$navEntries.addEventListener('click', showEntries);
$journal.addEventListener('click', handleJournalClick);

if (!data.entries.length) {
  $noEntries.className = 'no-entries';
} else {
  $noEntries.className = 'no-entries hidden';
}
for (var i = 0; i < data.entries.length; i++) {
  $journal.appendChild(getDOM(data.entries[i]));
}

$views.forEach(node => {
  if (node.getAttribute('data-view') === data.view) {
    node.className = 'view';
  } else {
    node.className = 'view hidden';
  }
});

function handleImgURL(event) {
  $img.setAttribute('src', event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  var newEntry = {
    title: $form.elements.title.value,
    imgURL: $form.elements.imgURL.value,
    notes: $form.elements.notes.value
  };
  newEntry.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $img.setAttribute('src', './images/placeholder-image-square.jpg');

  displayView('entries');
  $form.reset();
}

function handleJournalClick(event) {
  displayView('entry-form');
  var $parentEntry = event.target.closest('li');
  data.editing = $parentEntry.getAttribute('data-entry-id');
  $form.elements.title.value = data.entries[data.editing - 1].title;
  $form.elements.imgURL.value = data.entries[data.editing - 1].imgURL;
  $form.elements.notes.value = data.entries[data.editing - 1].notes;
  $img.setAttribute('src', $form.elements.imgURL.value);
}

function showNewForm(event) {
  displayView('entry-form');
}

function showEntries(event) {
  displayView('entries');
}

function displayView(viewType) {
  $views.forEach(node => {
    if (node.getAttribute('data-view') === viewType) {
      node.className = 'view';
    } else {
      node.className = 'view hidden';
    }
  });
  data.view = viewType;
}

function getDOM(entry) {
  var $node = document.createElement('li');
  $node.className = 'journal-entry';
  $node.setAttribute('data-entry-id', entry.nextEntryId);

  var $row = document.createElement('div');
  $row.className = 'row space-between';
  $node.appendChild($row);

  var $column1 = document.createElement('div');
  $column1.className = 'column-half';
  $row.appendChild($column1);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.imgURL);
  $column1.appendChild($img);

  var $column2 = document.createElement('div');
  $column2.className = 'column-half';
  $row.appendChild($column2);

  $row = document.createElement('div');
  $row.className = 'row align-center space-between';
  $column2.appendChild($row);

  var $title = document.createElement('h2');
  $title.textContent = entry.title;
  $row.appendChild($title);

  var $edit = document.createElement('img');
  $edit.setAttribute('src', 'images/edit-icon.png');
  $edit.className = 'edit-icon';
  $row.appendChild($edit);

  var $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $column2.appendChild($notes);

  return $node;
}
