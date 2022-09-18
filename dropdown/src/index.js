import './style.css';

// header
const linksLeft = document.querySelector('.left.links');
const linksRight = document.querySelector('.right.links');

function createLi(name, link, element) {
  const li = document.createElement('li');
  li.classList.add('link');
  li.innerHTML = `<a href= ${link}>${name}</a>`;
  li.setAttribute('id', name);
  element.appendChild(li);
}

createLi('Home', '#', linksLeft);
createLi('Blog', '#', linksLeft);
createLi('Projects', '#', linksRight);
createLi('More', '#', linksRight);

// more-links

const moreLinks = document.querySelector('.more-links');

createLi('Kaggle', '#', moreLinks);
createLi('Github', '#', moreLinks);
createLi('Music Gallery', '#', moreLinks);

// toggle on More
const moreDiv = document.querySelector('.more-div');
function toggleMore() {
  if (moreDiv.style.display === 'none') {
    moreDiv.style.display = 'block';
  } else {
    moreDiv.style.display = 'none';
  }
}

const more = document.querySelector('#More');
more.onclick = toggleMore;
