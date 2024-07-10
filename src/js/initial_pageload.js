import AddIcon from '../icons/plus-circle.svg';

const content = document.querySelector('.content');

function init() {
    const container = document.createElement('div');
    container.classList.add('init-container');

    const headline = document.createElement('h2');
    headline.textContent = 'Add Todo';
    const button = document.createElement('button');
    button.classList.add('modalBtn', 'modal-open');
    button.setAttribute('id','addTodo')
    button.setAttribute('data-id', 'todo-modal');
    const myIcon = new Image();
    myIcon.src = AddIcon;
    myIcon.classList.add('icon');
    /* myIcon.classList.add('modal-open'); */
   /*  myIcon.setAttribute('data-id','todo-modal'); */
    button.appendChild(myIcon);

    container.appendChild(headline);
    container.appendChild(button);

    content.appendChild(container);
}

export {init};