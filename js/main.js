/* global data */
/* exported data */

var $photoUrl = document.querySelector('#imgURL');
var $img = document.querySelector('img');
var $form = document.querySelector('.newEntry');
var $newEntryView = document.querySelector('.new-button');
var $navEntries = document.querySelector('.nav-entries');
var $views = document.querySelectorAll('.view');
var $ul = document.querySelector('.journal-entries');

$photoUrl.addEventListener('input', handleImgUrl);
$form.addEventListener('submit', handleSubmit);
$newEntryView.addEventListener('click', showNewForm);
$navEntries.addEventListener('click', showEntries);

if (!data.entries.length) {
  $ul.textContent = 'No entries have been recorded.';
} else {
  $ul.textContent = '';
}
for (var i = 0; i < data.entries.length; i++) {
  $ul.appendChild(getDOM(data.entries[i]));
}

$views.forEach(node => {
  if (node.getAttribute('data-view') === data.view) {
    node.className = 'view';
  } else {
    node.className = 'view hidden';
  }
});

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

function getDOM(entry) {
  var $node = document.createElement('li');
  $node.className = 'journal-entry';

  var $row = document.createElement('div');
  $row.className = 'row';
  $node.appendChild($row);

  var $column1 = document.createElement('div');
  $column1.className = 'column-half';
  $row.appendChild($column1);

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.imgUrl);
  $column1.appendChild($img);

  var $column2 = document.createElement('div');
  $column2.className = 'column-half';
  $row.appendChild($column2);

  var $title = document.createElement('h2');
  $title.textContent = entry.title;
  $column2.appendChild($title);

  var $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $column2.appendChild($notes);

  return $node;
}
