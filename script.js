
import {noteData} from './storage.js';

console.log(noteData);

class NoteCore {
    constructor(noteData = {lastId:0, note:[], categor: [
            'Task',
            'Random Thought',
            'Idea'
        ]}){
        this.data = noteData;
        this.month = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        this.initiateNote();

        // console.log(this.createBtn);
    }

    initiateNote() {
        this.fieldNote = document.querySelector('div.user-note');
        this.btnCreate = document.querySelector('div.create-note > button#create');
        this.createForm = document.querySelector('div#create-note');
        this.createFormBtn = document.querySelector('div#button-form');
        this.fieldArchive = document.querySelector('div#archive');

        this.createFormBtn.addEventListener('click', (eve) => this.formButton(eve, this.createForm, this.btnCreate));
        this.btnCreate.addEventListener('click', () => this.showCreateForm(true));


    }

    showCategorArchive () {
        if (this.data.categor.length === 0) return undefined;

        this.fieldArchive.innerHTML = '';
        // console.log();

        this.data.categor.forEach((value) => {

            this.data.note.filter(val => val.isArchive && val.category === value).length;

            this.fieldArchive.append(this.archiveHtml(value));
        })
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

    archiveHtml(value) {
        let div = document.createElement('div');
        let divNote = document.createElement('div');
        // let archive = this.data.note.filter(val => val.category === value && val.isArchive);

        divNote.setAttribute('id',value.replace(/\s+/g, ''));
        // divNote.hidden = true;

        div.innerHTML = `<ul class="node-tamp">
                <li>${value}</li>
                <li id="active">${this.data.note.filter(val => val.category === value && !val.isArchive).length}</li>
                <li id="archive">${this.data.note.filter(val => val.category === value && val.isArchive).length}</li>
            </ul>`;

        // archive.forEach(value1 => divNote.append(this.noteHTML(value1, true)));

        div.append(divNote);

        div.addEventListener('click', (event) => this.showArchNote(event, value));

        return div;
    }

    noteHTML(value, isArchive = false){
        let div = document.createElement('div');
        div.innerHTML = `<ul class="node-tamp">
                        <li>${this.trunCate(value.name)}</li>
                        <li>${this.trunCate(value.createDate)}</li>
                        <li>${this.trunCate(value.category)}</li>
                        <li>${this.trunCate(value.content)}</li>
                        <li>${this.trunCate(value.contentDate)}</li>
                        <li class="edit-button">
                            
                            ${isArchive ? `<a><img name="unArchive" src="img/unArchive.png" alt="UnArchive" 
                            width="32" height="32"></a>`: `<a><img name="edit" src="img/edit.png" alt="Edit" width="32" height="32"></a><a><img name="archive" src="img/archive.png" alt="Archive" width="32" height="32"></a><a><img name="delete" src="img/bin.png" alt="Delete" width="32" height="32"></a>`}
                            
                        </li>
                    </ul>`;
        div.addEventListener('click', (event) => this.handlerToDo(event, value.id));
        return div;
    }

    trunCate(str, maxLength = 25){
        return (str.length > maxLength) ? str.slice(0, maxLength - 1) + '…': str;
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

    showArchNote(e,value){
        console.log(value);
        if (this.data.note.length === 0) return undefined;

        let div = e.currentTarget.querySelector('div#'+value.replace(/\s+/g, ''));
        div.innerHTML = '';

        this.data.note.filter(val => val.category === value && val.isArchive).forEach(value1 => div.append(this.noteHTML(value1, true)));

        // e.currentTarget.addEventListener('click', () => div.innerHTML = '' );
        // e.currentTarget.append(div);

        // this.fieldNote.innerHTML = '';
        // console.log();

        // this.data.note.filter(value => !value.isArchive).forEach((value) => {
        //     // const note = this.noteHTML(value);
        //     this.fieldNote.append(this.noteHTML(value));
        // })

    }

    handlerToDo(event, id) {
        event = event || window.event;

        if (!(event && event.target.tagName === 'IMG')) return;

        // console.log(event.target);

        if (event.target.name === 'edit')
            this.showEditNote(event, id);
        else if (event.target.name === 'archive') {
            this.archiveNote(event, id);
        }
        else if (event.target.name === 'unArchive'){
            this.unArchiveNote(event, id);
        }
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

    plusArchive(){

    }

    minusArchive(){

    }

    unArchiveNote(e, id){
        this.data.note.find((item) => item.id === id).isArchive = false;
        e.currentTarget.remove();
        this.showNote();
    }

    archiveNote(e, id) {
        this.data.note.find((item) => item.id === id).isArchive = true;
        e.currentTarget.remove();
        this.showCategorArchive();
    }

    deleteNote(e, id) {
        let nmb = this.data.note.findIndex((item) => item.id === id);

        nmb !== -1 && this.data.note.splice(nmb, 1);
        e.currentTarget.remove();
    }

    formButton(event, div, btnCreate, id = -1){
        event = event || window.event;

        if (!(event && event.target.tagName === 'BUTTON')) return;

        if (event.target.name === 'cancel')
            this.showCreateForm(false, div, btnCreate, id);
        else if (event.target.name === 'save') {

            id === -1 ? this.createNewNote(div): this.editNote(div, btnCreate, id);
            this.showCreateForm(false, div, btnCreate, id);

        }

        div.querySelector("input[name=name]").value = '';
        div.querySelector("textarea[name=content]").value = '';

    }

    createNewNote(div){
        let note = {
            name: div.querySelector("input[name=name]").value,
            id: ++this.data.lastId,
            createDate: this.saveNoteDate(),
            category: div.querySelector("select[name=category]").value,
            content: div.querySelector("textarea[name=content]").value,
            contentDate: this.parseContent(div.querySelector("textarea[name=content]").value),
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
        editnote.contentDate = this.parseContent(div.querySelector("textarea[name=content]").value);

        oldnote.innerHTML = this.noteHTML(editnote).innerHTML;

        console.log(this.data.note);
    }

    saveNoteDate() {
        const date = new Date();

        return `${this.month[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`;
    }

    parseContent(content){

        let myRe = /\d+\/\d+\/\d+/g;
        let res = [];

        let myArray;
        while ((myArray = myRe.exec(content)) !== null) {
            res.push(myArray[0]);
        }

        return res.join(', ');
    }

    showCreateForm(isShow, createForm = this.createForm, btnCreate = this.btnCreate, id = -1){

        id === -1 ? (createForm.hidden = !isShow) : createForm.remove();
        btnCreate.hidden = isShow;

    }



}

const myClass = new NoteCore(noteData);

myClass.showNote();
myClass.showCategorArchive();


// myClass.parseContent('I’m gonna have a dentist appointment on the 3/5/2021, I moved it from' +
//     ' 5/5/2021 sdfdfsdfsdfsdfs5/53f/2021');

// console.log(document.querySelector('div.user-note'));