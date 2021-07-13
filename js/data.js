/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var prevData = localStorage.getItem('javascript-local-storage');
if (prevData) {
  data = JSON.parse(prevData);
}

var $ul = document.querySelector('.journal-entries');
for (var i = 0; i < data.entries.length; i++) {
  $ul.appendChild(getDOM(data.entries[i]));
}

window.addEventListener('beforeunload', handleLocalStorage);

function handleLocalStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
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
