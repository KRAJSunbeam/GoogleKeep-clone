const addButton = document.querySelector('#add');
const notesContainer = document.getElementById('notes-container');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('.note textarea');
    const notes = [];

    textAreaData.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
    console.log('Data saved to local storage:', notes);
};

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash"></i></button>
        </div>

        <div class="main ${text ? '' : 'hidden'}">${text}</div>
        <textarea class="${text ? 'hidden' : ''}">${text}</textarea>
    `;

    note.insertAdjacentHTML('afterbegin', htmlData);

    // getting the references
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting the note
    deleteButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    // Toggle using edit button (between textarea and mainDiv)
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        console.log('Textarea value changed:', value);
        mainDiv.innerHTML = value;
        updateLSData();
    });

    notesContainer.appendChild(note);
    console.log('New note added:', text);

    updateLSData(); // Call this to save data when a new note is added
};

// getting data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener('click', () => {
    addNewNote();
});
