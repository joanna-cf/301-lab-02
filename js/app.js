'use strict';

function startApp(){
  getData();
}

function getData(){
  const success = horns => displayPage(horns);
  const failure = error => console.log(error);

  $.get('data/page-1.json', 'json')
    .then(success)
    .catch(failure);
}

function displayPage(horns){
  horns.forEach(element => {
    const $newHorn = $('#photo-template').clone();

    $newHorn.find('h2').text(element.title);
    $newHorn.find('img').attr('src', element.image_url);
    $newHorn.find('p').text(element.description);
    $newHorn.removeAttr('id');

    $('main').append($newHorn);
  });
}

$(startApp);
