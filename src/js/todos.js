const {formatDistanceToNow, isFuture} = require("date-fns");

export class Todo {
    constructor(title = '', dueDate = '', priority = 'low', notes = '', checklist = []){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.completed = false;
    } 

    getDistanceToNow () {
        return formatDistanceToNow(new Date(this.dueDate)); //Return timedifference (always positive)
    }

    isInFuture () {
        return isFuture(new Date(this.dueDate)); //Return true or false
    }
};

