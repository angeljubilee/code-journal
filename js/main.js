/* global data */
/* exported data */

var $formTitle = document.querySelector('.form-title');
var $photoUrl = document.querySelector('#imgURL');
var $img = document.querySelector('img');
var $form = document.querySelector('.newEntry');
var $newEntryView = document.querySelector('.new-button');
var $navEntries = document.querySelector('.nav-entries');
var $views = document.querySelectorAll('.view');
var $journal = document.querySelector('.journal-entries');
var $noEntries = document.querySelector('.no-entries');
var $deleteEntry = document.querySelector('.delete-entry');
var $modal = document.querySelector('.modal');
var $cancelModal = document.querySelector('.modal-cancel');
var $confirmDelete = document.querySelector('.modal-confirm');

$photoUrl.addEventListener('input', handleImgURL);
$form.addEventListener('submit', handleSubmit);
$newEntryView.addEventListener('click', showNewForm);
$navEntries.addEventListener('click', showEntries);
$journal.addEventListener('click', handleJournalEdit);
$deleteEntry.addEventListener('click', showModal);
$cancelModal.addEventListener('click', hideModal);
$confirmDelete.addEventListener('click', deleteEntry);

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
  var $newNode = {};

  if (data.editing) {
    var entry = findDataEntry(data.editing);
    entry.title = $form.elements.title.value;
    entry.imgURL = $form.elements.imgURL.value;
    entry.notes = $form.elements.notes.value;

    var $prevNode = findNodeEntry(data.editing);
    $newNode = getDOM(entry);
    $journal.replaceChild($newNode, $prevNode);
    data.editing = null;
  } else {
    var newEntry = {
      title: $form.elements.title.value,
      imgURL: $form.elements.imgURL.value,
      notes: $form.elements.notes.value
    };
    newEntry.nextEntryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newEntry);

    $newNode = getDOM(newEntry);
    $journal.insertBefore($newNode, $journal.firstChild);
  }

  displayView('entries');
}

function handleJournalEdit(event) {
  if (!event.target.matches('.edit-icon')) {
    return;
  }
  displayView('entry-form');
  $deleteEntry.className = 'delete-entry';
  $deleteEntry.parentElement.className = 'row align-center space-between';

  var $parentEntry = event.target.closest('li');
  data.editing = parseInt($parentEntry.getAttribute('data-entry-id'));

  var entry = findDataEntry(data.editing);
  $form.elements.title.value = entry.title;
  $form.elements.imgURL.value = entry.imgURL;
  $form.elements.notes.value = entry.notes;
  $img.setAttribute('src', $form.elements.imgURL.value);
  $formTitle.textContent = 'Edit Entry';
}

function showNewForm(event) {
  data.editing = null;
  $deleteEntry.parentElement.className = 'row align-center flex-end';
  $formTitle.textContent = 'New Entry';
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  $deleteEntry.className += ' hidden';
  $form.reset();
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

function showModal(event) {
  $modal.className = 'modal dark-background';
}

function hideModal(event) {
  $modal.className += ' hidden';
}

function deleteEntry(event) {
  data.entries.splice(findIndex(data.editing), 1);

  var $node = findNodeEntry(data.editing);
  $node.remove();
  displayView('entries');
  data.editing = null;
  $modal.className += ' hidden';
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

function findDataEntry(id) {
  var entry = 0;
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].nextEntryId === id) {
      entry = data.entries[i];
      return entry;
    }
  }
}

function findIndex(id) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].nextEntryId === id) {
      return i;
    }
  }
}

function findNodeEntry(id) {
  var children = $journal.children;
  for (var i = 0; i < children.length; i++) {
    if (parseInt(children[i].getAttribute('data-entry-id')) === id) {
      return children[i];
    }
  }
}
