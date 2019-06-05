function startApp(){
  getData();
  attachListeners();
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
    $newHorn.attr('class', element.keyword);
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
    $newOption.val(word);
    $newOption.removeAttr('id');
    $('select').append($newOption);
  });
}

function attachListeners(){
  $('select').on('change', event => {
    const $selected = $(event.target);
    const type = $selected.val();

    $('section').hide();

    if (type === 'narwhal'){
      $('section[class="narwhal"]').show();
    } else if (type === 'rhino'){
      $('section[class="rhino"]').show();
    } else if (type === 'unicorn'){
      $('section[class="unicorn"]').show();
    } else if (type === 'unilego'){
      $('section[class="unilego"]').show();
    } else if (type === 'triceratops'){
      $('section[class="triceratops"]').show();
    } else if (type === 'markhor'){
      $('section[class="markhor"]').show();
    } else if (type === 'mouflon'){
      $('section[class="mouflon"]').show();
    } else if (type === 'addax'){
      $('section[class="addax"]').show();
    } else if (type === 'chameleon'){
      $('section[class="chameleon"]').show();
    } else if (type === 'lizard'){
      $('section[class="lizard"]').show();
    } else if (type === 'dragon'){
      $('section[class="dragon"]').show();
    } else {
      $('section').show();
    }
  });
}

$(startApp);
