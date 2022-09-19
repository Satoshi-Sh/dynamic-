import { create } from 'lodash';
import './style.css';

// import pictures
// refer https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack

function importAll(r) {
  const images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const gallery = document.querySelector('.gallery');

function makeImage(path, id) {
  const myIcon = new Image();
  myIcon.src = path;
  myIcon.setAttribute('id', `image_${id}`);
  gallery.append(myIcon);
}

// check number of files

const keys = Object.keys(images);

for (let i = 0; i < keys.length; i++) {
  makeImage(`${images[keys[i]]}`, i);
}

function showImage(index) {
  // use zIndex 1 for displayed image
  const image = document.querySelector(`#image_${index}`);
  image.style.zIndex = 1;
  // add animation
  image.classList.add('fadeout');
  // else zInsex 0
  for (let i = 0; i < keys.length; i++) {
    if (i === index) {
      continue;
    } else {
      const imageElse = document.querySelector(`#image_${i}`);
      imageElse.style.zIndex = 0;
      imageElse.classList.remove('fadeout');
    }
  }
  // change current image number in the handle

  const handleNumber = document.querySelector(`#number_${index}`);
  if (handleNumber) {
    handleNumber.style.color = 'lightblue';
    // else color
    for (let i = 0; i < keys.length; i++) {
      if (i === index) {
        continue;
      } else {
        const numberElse = document.querySelector(`#number_${i}`);
        numberElse.style.color = 'gainsboro';
      }
    }
  }
}

// create handle
const handleUl = document.querySelector('.handle');

function createDiv(name) {
  const div = document.createElement('div');
  div.classList.add('button');
  div.setAttribute('id', name);
  div.innerText = name;
  handleUl.appendChild(div);
}

createDiv('Back');
// make div between Back and Next;

const div = document.createElement('div');
div.classList.add('numbers');
div.innerHTML = '<ul></ul>';
for (let i = 0; i < keys.length; i++) {
  const li = document.createElement('li');
  li.classList.add('number');
  li.setAttribute('id', `number_${i}`);
  li.innerText = i + 1;
  const ul = div.querySelector('ul');
  ul.appendChild(li);
  div.appendChild(ul);
}
handleUl.appendChild(div);

createDiv('Next');

// add trigger to back and next button

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const operation = e.target.innerText;
    showNext(operation);
  });
});

function showNext(operation) {
  const current = parseInt(document.querySelector('img[style="z-index: 1;"]').getAttribute('id').split('_').at(1));
  if (operation === 'Back' & current - 1 >= 0) {
    showImage(current - 1);
  } else if (operation === 'Next' & current + 1 < keys.length) {
    showImage(current + 1);
  } else if (operation === 'Next' & current + 1 == keys.length) {
    showImage(0);
  } else if (operation === 'Back' & current - 1 == -1) {
    showImage(keys.length - 1);
  }
}

// add trigger to numebers

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
  number.addEventListener('click', () => {
    const index = number.getAttribute('id').split('_').at(1);
    showImage(parseInt(index));
  });
});

// default
showImage(0);

// set timeout
setInterval(showNext, 5000, 'Next');
