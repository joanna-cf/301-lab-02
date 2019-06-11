//FLoads page
function startApp(){
  showPage(1, 'alphabet');
  addPageListeners();
  addSortListener();
}

//Gets data from json, displays depending on page number chosen
function showPage(pageNum, sortStyle){
  let infoName;
  if(pageNum === 1){
    infoName = 'data/page-1.json';
  } else {
    infoName = 'data/page-2.json';
  }

  let sortedHorns = [];
  
  const success = hornsData => {
    if (sortStyle === 'alphabet'){
      sortedHorns = sortAlphabetically(hornsData);
    } else {
      sortedHorns = sortNumerically(hornsData);
    }
    addHorns(sortedHorns);
    addOptions(sortedHorns);
    addOptionsListeners(sortedHorns);

  }

  $.get(infoName, 'json')
    .then(success)
    .catch(error => console.error(error));
}

//Accesses image sections template, renders images to page
function addHorns(hornsInfo){
  const template = $('#photo-template').html();
  const render = Handlebars.compile(template);
  let hornsArray = [];
  hornsInfo.forEach(horn => {
    hornsArray.push(render(horn))
  });
  $('#hornsGoHere').append(hornsArray);
}

//Accesses options template, adds options to select
function addOptions(allObjects){
  const template = $('#dropDownTemplate').html();
  const render = Handlebars.compile(template);

  let optionsArray = [];
  let filteredObjects = filterKeywords(allObjects);

  filteredObjects.forEach(object => {
    optionsArray.push(render(object))
  });

  $('#optionsGoHere').append(optionsArray);
}

//Filters keywords, returns array with unique objects
function filterKeywords(insertArrayObjects){
  let filteredKeywords = [];
  let filteredObjects =[];

  insertArrayObjects.forEach(element => {
    if (filteredKeywords.includes(element.keyword) === false){
      filteredKeywords.push(element.keyword);
      filteredObjects.push(element);
    }
  });
  return filteredObjects;
}

//Adds listener to page nav, changes images displayed
function addPageListeners(){
  $('nav li').on('click', event => {
    $('#hornsGoHere').empty();
    $('[class="tempOptions"]').remove();
    $('li').attr('class', 'not checked');
    let sortStyle = $('input[type="radio"]:checked').val();
    const pageNum = $(event.target).data('page');
    $(event.target).attr('class', 'checked');
    console.log('PAGE LISTENER- page number:' + pageNum + 'sortStyle: ' + sortStyle);
    showPage(pageNum, sortStyle);
  });
}

//Function to sort
function addSortListener(){
  $('input[type="radio"]').on('click', event => {
    $('#hornsGoHere').empty();
    $('[class="tempOptions"]').remove();
    let pageNum = $('li[class="checked"]').data('page');
    const sortStyle = $(event.target).val();
    console.log('SORT LISTENER- page number:' + pageNum + 'sortStyle: ' + sortStyle);
    showPage(pageNum, sortStyle);
  })
}

//Adds listener to select, filters images based on option chosen
function addOptionsListeners(arrayOfObjects){
  $('select').on('change', event => {
    $('section').hide();
    const $selected = $(event.target);
    const type = $selected.val();

    arrayOfObjects.forEach(object =>{
      if(type === object.keyword){
        $(`.${type}`).show();
      }
    });
  });
}

//Sorts images alphabetically
function sortAlphabetically(arr){
  arr.sort((a, b) => {
    if (a.title < b.title){
      return -1;
    }
    if (a.title > b.title){
      return 1;
    }
    return 0;
  });
  return arr;
}

//Sorts images by horn number
function sortNumerically(arr){
  arr.sort((a, b) => {
    if (a.horns < b.horns){
      return -1;
    }
    if (a.horns > b.horns){
      return 1;
    }
    return 0;
  });
  return arr;
}

//Runs page
$(startApp);

