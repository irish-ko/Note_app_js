
import {noteData} from './storage.js';

console.log(noteData);

class NoteCore {
    constructor(noteData = {lastId:0, note:[]}){
        this.data = noteData;

        this.initiateNote();

        // console.log(this.createBtn);
    }

    initiateNote() {
        this.fieldNote = document.querySelector('div.user-note');
        this.createBtn = document.querySelector('div.create-note > button#create');
        this.createForm = document.querySelector('div#create-note');
        this.createFormBtn = document.querySelector('div#button-form');

        this.createFormBtn.addEventListener('click', (eve) => this.formButton(eve, this.createForm));
        this.createBtn.addEventListener('click', () => this.showCreateForm(true));


    }

    showNote() {
        if (this.data.note.length === 0) return undefined;

        this.fieldNote.innerHTML = '';
        // console.log();

        this.data.note.filter(value => !value.isArchive).forEach((value) => {
            // const note = this.noteHTML(value);
            this.fieldNote.append(this.noteHTML(value));
        })
    }

    noteHTML(value){
        let div = document.createElement('div');
        div.innerHTML = `<ul class="node-tamp">
                        <li>${value.name}</li>
                        <li>${value.createDate}</li>
                        <li>${value.category}</li>
                        <li>${value.content}</li>
                        <li>${value.contentDate}</li>
                        <li class="edit-button">
                            <a><img name="edit" src="img/edit.png" alt="Edit" width="32" height="32"></a>
                            <a><img name="archive" src="img/archive.png" alt="Archive" width="32" height="32"></a>
                            <a><img name="delete" src="img/bin.png" alt="Delete" width="32" height="32"></a>
                        </li>
                    </ul>`;
        div.firstChild.addEventListener('click', (event) => this.handlerToDo(event, value.id));
        return div;
    }

    handlerToDo(event, id) {
        event = event || window.event;
        // console.dir(id);
        if (!(event && event.target.tagName === 'IMG')) return;

        // console.log(event.target);

        if (event.target.name === 'edit')
            this.editNote(event);
        else if (event.target.name === 'archive')
            this.archiveNote(event, id);
        else if (event.target.name === 'delete')
            this.deleteNote(event, id);


    }

    editNote(e) {

    }

    archiveNote(e, id) {
        e.currentTarget.remove();
        this.data.note.find((item) => item.id === id).isArchive = true;

        // console.log(this.data.note);
    }

    deleteNote(e, id) {
        let nmb = this.data.note.findIndex((item) => item.id === id);
        nmb !== -1 && this.data.note.splice(nmb, 1);
        e.currentTarget.remove();

        // console.dir(this.data.note);
    }

    formButton(event, div){
        event = event || window.event;
        console.dir(event.currentTarget);

        if (!(event && event.target.tagName === 'BUTTON')) return;

        if (event.target.name === 'cancel')
            this.showCreateForm(false);
        else if (event.target.name === 'save') {

            this.createNewNote(div);
            this.showCreateForm(false);

        }

        div.querySelector("input[name=name]").value = '';
        div.querySelector("textarea[name=content]").value = '';

    }

    createNewNote(div){
        let note = {
            name: div.querySelector("input[name=name]").value,
            id: ++this.data.lastId,
            createDate: 'April 20, 2021',
            category: div.querySelector("select[name=category]").value,
            content: div.querySelector("textarea[name=content]").value,
            contentDate: 'none',
            isArchive: false,
        };

        // div.querySelector("input[name=name]").value = '';
        // div.querySelector("textarea[name=content]").value = '';

        this.fieldNote.append(this.noteHTML(note));
        this.data.note.push(note);
        // console.log(note);
        console.log(this.data.note);

    }

    showCreateForm(isShow){
        // console.log(this);
        this.createForm.hidden = !isShow;
        this.createBtn.hidden = isShow;
        // const div = document.createElement('div');
        // div.innerHTML = `<div class="create-form" >
        //                     <label>
        //                         Name note:
        //                         <input type="text">
        //                     </label>
        //                     <label>
        //                         Select category:
        //                         <select name="">
        //                             <option value="1">Task</option>
        //                             <option value="2">Random Thought</option>
        //                             <option value="3">Idea</option>
        //                         </select>
        //                     </label>
        //                     <label>
        //                         Content note:
        //                         <textarea name="Content" id="Content" cols="30" rows="2"></textarea>
        //                         <!--<input type="text">-->
        //                     </label>
        //                 </div>
        //                 <div class="btn bottom-note">
        //                     <button>Save</button>
        //                     <button>Cancel</button>
        //                 </div>`;
        // this.createBtn.before(div)
    }



}

const myClass = new NoteCore(noteData);

myClass.showNote();

// console.log(document.querySelector('div.user-note'));