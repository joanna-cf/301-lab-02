function startApp(){
  getData();
}

function getData(){
  const success = horns => {
    displayPage(horns);
    addDropDownOptions(horns);
  };
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
  $('#photo-template').hide();
}

function addDropDownOptions(horns){
  let $keywordArray = [];

  horns.forEach(element => {
    if ($keywordArray.includes(element.keyword) === false){
      $keywordArray.push(element.keyword);
    }
  });

  $('option').attr('id', 'filter');

  $keywordArray.forEach(word => {
    const $newOption = $('#filter').clone();
    $newOption.text(word);
    $newOption.removeAttr('id');
    $('select').append($newOption);
  });
}

$(startApp);
