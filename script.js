
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
        this.btnCreate = document.querySelector('div.create-note > button#create');
        this.createForm = document.querySelector('div#create-note');
        this.createFormBtn = document.querySelector('div#button-form');

        this.createFormBtn.addEventListener('click', (eve) => this.formButton(eve, this.createForm, this.btnCreate));
        this.btnCreate.addEventListener('click', () => this.showCreateForm(true));


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
        div.addEventListener('click', (event) => this.handlerToDo(event, value.id));
        return div;
    }

    htmlEditNote(id){

        const value = this.data.note.find(ind => ind.id === id);

        const div = document.createElement('div');

        div.innerHTML = `<div class="create-form" >
                            <label>
                                Name note:
                                <input name="name" type="text" value="${value.name}">
                            </label>
                            <label>
                                Select category:
                                <select name="category">
                                    <option value="${value.category}" hidden>${value.category}</option>
                                    <option value="Task">Task</option>
                                    <option value="Random Thought">Random Thought</option>
                                    <option value="Idea">Idea</option>
                                </select>
                            </label>
                            <label>
                                Content note:
                                <textarea name="content" id="Content" cols="30" rows="2">${value.content}</textarea>
                                <!--<input type="text">-->
                            </label>
                        </div>
                        <div class="btn">
                            <button name="save">Save</button>
                            <button name="cancel">Cancel</button>
                        </div>`;

        return div;
    }

    handlerToDo(event, id) {
        event = event || window.event;
        // console.dir(id);
        if (!(event && event.target.tagName === 'IMG')) return;

        // console.log(event.target);

        if (event.target.name === 'edit')
            this.showEditNote(event, id);
        else if (event.target.name === 'archive')
            this.archiveNote(event, id);
        else if (event.target.name === 'delete')
            this.deleteNote(event, id);


    }

    showEditNote(e, id) {
        const edithtml = this.htmlEditNote(id);
        const oldNote = e.currentTarget;

        edithtml.hidden = true;

        oldNote.before(edithtml);


        edithtml.addEventListener('click', (event) => this.formButton(event, edithtml, oldNote, id));
        this.showCreateForm(true, edithtml, oldNote);


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

    formButton(event, div, btnCreate, id = -1){
        event = event || window.event;

        // console.dir(event.target);
        // console.dir(div);
        // console.dir(btnCreate);

        if (!(event && event.target.tagName === 'BUTTON')) return;

        if (event.target.name === 'cancel')
            this.showCreateForm(false, div, btnCreate);
        else if (event.target.name === 'save') {

            id === -1 ? this.createNewNote(div): this.editNote(div, btnCreate, id);
            this.showCreateForm(false, div, btnCreate);

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

        this.fieldNote.append(this.noteHTML(note));
        this.data.note.push(note);

        // console.log(note);
        console.log(this.data.note);

    }

    editNote(div, oldnote, id) {
        const editnote = this.data.note.find((item) => item.id === id);

        editnote.name = div.querySelector("input[name=name]").value;
        editnote.category = div.querySelector("select[name=category]").value;
        editnote.content = div.querySelector("textarea[name=content]").value;

        oldnote.innerHTML = this.noteHTML(editnote).innerHTML;

        console.log(this.data.note);
    }

    showCreateForm(isShow, createForm = this.createForm, btnCreate = this.btnCreate){

        // console.log(createForm);
        // console.log(btnCreate);

        createForm.hidden = !isShow;
        btnCreate.hidden = isShow;
    }



}

const myClass = new NoteCore(noteData);

myClass.showNote();

// console.log(document.querySelector('div.user-note'));