// Function to start the app and render the page
function startApp(){
  getData();
  attachListeners();
}

//Function to get data from json files
function getData(){
  const success = horns => {
    console.log('success');
    displayPage(horns);
    addDropDownOptions(horns);
  };
  const failure = error => console.log(error);

  //First json file
  $.get('data/page-1.json', 'json')
    .then(success)
    .catch(failure);

  //Second json file
  $.get('data/page-2.json', 'json')
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

  $('nav li').on('click', event => {
    const pageNum1 = $(event.target).attr('data-page');
    showCurrentPage(pageNum1);
    console.log('clicking');
  });
}

function showCurrentPage(pageNum1){
  $('.page').hide();

  if(parseInt(pageNum1) === 1){
    $('.page-1-stuff').show();
    console.log('page1stuff');
  } else {
    $('.page-2-stuff').show();
    console.log('page2stuff');
  }
}

$(startApp);
