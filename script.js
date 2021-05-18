// taking reference
const addButton = document.querySelector('#add');


// working with local storage
const updateLSData = () => {
    // saving data in array formate
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    // getting data in array one at a time
    textAreaData.forEach((note) => {
        // adding data in notes array
        return notes.push(note.value);
    })


    // Adding localstorage
    localStorage.setItem('notes', JSON.stringify(notes));  // In 2nd parameter it required 'string value', so we use json because 'note' is an array
}







const addNewNote = (text = '') => {
    // creating new div
    const note = document.createElement('div');
    // creating class
    note.classList.add('note');


    const htmlData = `
    <div class="operation">
        <button class="edit"> <i class="fas fa-edit"></i> </button>
        <button class="delete"> <i class="fas fa-trash-alt"></i> </button>
    </div>
        
    <div class="main ${text ? "" : "hidden"}"> </div>
    <textarea class="${text ? "hidden" : ""}"></textarea> `;

    // Now adding htmlData inside (note div)
    note.insertAdjacentHTML('afterbegin',htmlData);


    // getting the references
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');


    // deleting the note
    delButton.addEventListener('click',() => {
        note.remove();
        updateLSData();
    })


    // toggle using edit button (between main-div and textarea)
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click',() => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        // taking value what user type in note
        const value = event.target.value;
        // console.log(value);
        mainDiv.innerHTML = value;


        // working with local storage
        updateLSData();
    })


    // appendChild is use to appends a node as the last child of a node
    document.body.appendChild(note);
}


// Getting data back from localstorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){ notes.forEach((note) => addNewNote(note)) };

addButton.addEventListener('click', () => addNewNote() );
