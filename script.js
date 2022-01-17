
import {noteData} from './storage.js';


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

    }

    initiateNote() {
        this.fieldNote = document.querySelector('div.user-note');
        this.btnCreate = document.querySelector('div.create-note > button#create');
        this.createForm = document.querySelector('div #create-note');
        this.createFormBtn = document.querySelector('div #button-form');
        this.fieldArchive = document.querySelector('div #archive');

        this.createFormBtn.addEventListener('click', (eve) => this.formButton(eve, this.createForm, this.btnCreate));
        this.btnCreate.addEventListener('click', () => this.showCreateForm(true));


    }

    showCategorArchive () {
        if (this.data.categor.length === 0) return undefined;

        this.fieldArchive.innerHTML = '';

        this.data.categor.forEach((value) => {

            this.data.note.filter(val => val.isArchive && val.category === value).length;

            this.fieldArchive.append(this.archiveHtml(value));
        })
    }

    showNote() {
        if (this.data.note.length === 0) return undefined;

        this.fieldNote.innerHTML = '';

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

        div.innerHTML = `<ul class="node-tamp arch-hover" id="${value.replace(/\s+/g, '')}" >
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

        if (this.data.note.length === 0) return undefined;

        let div = e.currentTarget.querySelector('div#'+value.replace(/\s+/g, ''));
        div.innerHTML = '';

        this.data.note.filter(val => val.category === value && val.isArchive).forEach(value1 => div.append(this.noteHTML(value1, true)));

    }

    handlerToDo(event, id) {
        event = event || window.event;

        if (!(event && event.target.tagName === 'IMG')) return;


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

    changeActiveStat(ul, change = 1){
        let li = ul.querySelector('li#active');

        li.innerHTML = +li.innerHTML + +change;
    }

    changeArchiveStat(ul, change = -1){
        let li = ul.querySelector('li#archive');

        li.innerHTML = +li.innerHTML + +change;
    }

    unArchiveNote(e, id){
        let note = this.data.note.find((item) => item.id === id);
        let ul = this.fieldArchive.querySelector('ul#' + note.category.replace(/\s+/g, ''));

        note.isArchive = false;
        e.currentTarget.remove();

        this.changeActiveStat(ul, 1);
        this.changeArchiveStat(ul, -1);
        this.showNote();
    }

    archiveNote(e, id) {
        let note = this.data.note.find((item) => item.id === id);

        note.isArchive = true;
        e.currentTarget.remove();

        this.showCategorArchive();
    }

    deleteNote(e, id) {
        let nmb = this.data.note.findIndex((item) => item.id === id);

        if (nmb === -1) retrun;

        let ul = this.fieldArchive.querySelector('ul#' + this.data.note[nmb].category.replace(/\s+/g, ''));

        this.data.note.splice(nmb, 1);
        e.currentTarget.remove();
        this.changeActiveStat(ul, -1);
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
        let ul = this.fieldArchive.querySelector('ul#' + note.category.replace(/\s+/g, ''));

        this.fieldNote.append(this.noteHTML(note));
        this.data.note.push(note);
        this.changeActiveStat(ul, 1);

    }

    editNote(div, oldnote, id) {
        const editnote = this.data.note.find((item) => item.id === id);
        let oldCategory = editnote.category;

        editnote.name = div.querySelector("input[name=name]").value;
        editnote.category = div.querySelector("select[name=category]").value;
        editnote.content = div.querySelector("textarea[name=content]").value;
        editnote.contentDate = this.parseContent(div.querySelector("textarea[name=content]").value);

        oldnote.innerHTML = this.noteHTML(editnote).innerHTML;

        if (oldCategory !== editnote.category) {
            let oldUl = this.fieldArchive.querySelector('ul#' + oldCategory.replace(/\s+/g, ''));
            let ul = this.fieldArchive.querySelector('ul#' + editnote.category.replace(/\s+/g, ''));

            this.changeActiveStat(oldUl, -1);
            this.changeActiveStat(ul, 1);
        }

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
