import AddIcon from '../icons/plus-circle.svg';

const content = document.querySelector('.content');

function init() {
    const container = document.createElement('div');
    container.classList.add('init-container');

    const headline = document.createElement('h2');
    headline.textContent = 'Add Todo';
    const button = document.createElement('button');
    button.classList.add('addTodo');
    const myIcon = new Image();
    myIcon.src = AddIcon;
    myIcon.classList.add('icon');
    button.appendChild(myIcon);

    container.appendChild(headline);
    container.appendChild(button);

    content.appendChild(container);
}

export {init};