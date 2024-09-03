// elementos
const noteContainer = document.querySelector('.notes');
const noteInput = document.querySelector('#addnote');
const addNoteBtn = document.querySelector('#add');
const searchBtn = document.querySelector('#buscar');
const exportBtn = document.querySelector('#exportnotes');

//funções

function showNotes(){
    cleanNotes();

    getNotes().forEach(note => {
        const noteElement = createNote(note.id, note.content, note.fixed);


        noteContainer.appendChild(noteElement);
    });

}

function cleanNotes(){
    noteContainer.replaceChildren([]);
}

const addNote = () => {

    const notes = getNotes();

    const noteObject = {
        id:generateId(),
        content: noteInput.value,
        fixed: false,
    };
    
    
    const noteElement = createNote(noteObject.id, noteObject.content);

    noteContainer.appendChild(noteElement);

    notes.push(noteObject);
    saveNotes(notes);

    noteInput.value = '';
};

function generateId(){
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed){

    const element = document.createElement('div');

    element.classList.add('note');

    const textarea = document.createElement('textarea');
    textarea.value = content;
    textarea.placeholder = 'Digite uma nota...';
    element.appendChild(textarea);

    const pinIcon = document.createElement('i');

    pinIcon.classList.add(...["bi", "bi-pin"]);

    element.appendChild(pinIcon);  

    const deleteIcon = document.createElement('i');

    deleteIcon.classList.add(...["bi", "bi-x-lg"]);

    element.appendChild(deleteIcon);  

    const duplicateIcon = document.createElement('i');

    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);

    element.appendChild(duplicateIcon);   

    if (fixed){
        element.classList.add('fixed');
    }

    element.querySelector('textarea').addEventListener('keyup', (e)=>{

        const noteContent = e.target.value;

        updateNote(id, noteContent);
    })


    element.querySelector('.bi-pin').addEventListener('click', () => {
        toggleFixNote(id);
    });

    element.querySelector('.bi-x-lg').addEventListener('click', () => {
        deleteNote(id, element);
    });

    element.querySelector('.bi-file-earmark-plus').addEventListener('click', () => {
        copyNote(id);
    });

    return element
}

function copyNote(id) {

    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    const noteObject = {
        id:generateId(),
        content: targetNote.content,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed);
    
    noteContainer.appendChild(noteElement);

    notes.push(noteObject);

    saveNotes(notes);
}

function toggleFixNote(id){
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.fixed = !targetNote.fixed;

    saveNotes(notes);

    showNotes();
}

//localStorage

function getNotes(){
    const notes =  JSON.parse(localStorage.getItem('notes') || '[]');

    const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

    return orderedNotes;
}


function saveNotes(notes){
    localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNote(id, element){
    const notes = getNotes().filter((note) => note.id !== id);

    saveNotes(notes);
    noteContainer.removeChild(element);
}

function updateNote (id, content){
    const notes = getNotes();

    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.content = content;

    saveNotes(notes);
}

function searchNotes(search){

    const filteredNotes = getNotes().filter((note) => note.content.includes(search));

    if(search !== ''){
        cleanNotes();

        filteredNotes.forEach(note => {
            const noteElement = createNote(note.id, note.content);
            noteContainer.appendChild(noteElement);
        });

        return;
    }

    cleanNotes();

    showNotes();
}


function exportData(){

    const notes = getNotes();

    //separa o dado por virgula e pula linha para o /n

    const csvString = [
        ['Id', 'Conteúdo', 'Fixado?'],
        ...notes.map((note) => [note.id, note.content, note.fixed ? 'Sim' : 'Não'])
    ].map(e => e.join(',')).join('\n');

    console.log(csvString);

    const elements = document.createElement('a');

    elements.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);

    elements.target = '_blank';

    elements.download = 'devNotes.csv';

    elements.click();

}

//eventos

addNoteBtn.addEventListener('click',() =>  addNote());

searchBtn.addEventListener('keyup', (e) =>{

    const search = e.target.value;
    searchNotes(search);
})

noteInput.addEventListener('keydown', (e) => {

    if(e.key === 'Enter'){
        addNote();
    }
})

exportBtn.addEventListener('click', () => {
    exportData();
})

//inicialização
showNotes();