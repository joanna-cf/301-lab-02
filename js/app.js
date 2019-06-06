// Function to start the app and render the page
let arr = [];
let arr2 = [];

function startApp(){
  getData();
  // giveClass(arr, arr2);
  attachListeners();
}

//Function to get data from json files
function getData(){
  // debugger;
  const success1 = horns => {
    horns.forEach(element => arr.push(element));
    displayPage(arr);
    addDropDownOptions(arr);
    console.log('array',arr);
  };
  const failure1 = error => console.log(error);

  //First json file
  $.get('data/page-1.json', 'json')
    .then(success1)
    .catch(failure1);

  const success2 = horns2 => {
    horns2.forEach(element => arr2.push(element));
    displayPage(arr2);
    addDropDownOptions(arr2);
    console.log('array2',arr2);
  };
  const failure2 = error => console.log(error);

  //Second json file
  $.get('data/page-2.json', 'json')
    .then(success2)
    .catch(failure2);

}

function displayPage(insertArray){
  insertArray.forEach(element => {
    const $newHorn = $('#photo-template').clone();

    $newHorn.find('h2').text(element.title);
    $newHorn.find('img').attr('src', element.image_url);
    $newHorn.find('p').text(element.description);
    $newHorn.attr('class', element.keyword);
    $newHorn.removeAttr('id');
    if (insertArray === arr){
      $newHorn.attr('class', 'group1');
    } else if (insertArray === arr2){
      $newHorn.attr('class', 'group2');
    }
    $('main').append($newHorn);
  });
  $('#photo-template').hide();

}

function addDropDownOptions(insertArray){
  let $keywordArray = [];

  insertArray.forEach(element => {
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
    const pageNum = $(event.target).attr('data-page');
    showCurrentPage(pageNum);
    console.log('clicking', pageNum);
  });
}

// function giveClass(arr, arr2){
//   // debugger;
//   arr.forEach(element => element.attr('class', 'group1'));
//   arr2.forEach(element => element.attr('class', 'group2'));
// }

function showCurrentPage(pageNum){
  $('.group1').hide();
  $('.group2').hide();

//  $

  if(parseInt(pageNum) === 1){
    $('.group1').show();
    console.log('page1stuff');
  } else { //fix this later
    $('.group2').show();
    console.log('page2stuff');
  }
}

$(startApp);

