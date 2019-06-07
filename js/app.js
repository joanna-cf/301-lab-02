//FLoads page
function startApp(){
  showPage(1);
  addPageListeners();
}

//Gets data from json, displays depending on page number chosen
function showPage(pageNum){
  let infoName;
  if(pageNum === 1){
    infoName = 'data/page-1.json';
  } else {
    infoName = 'data/page-2.json';
  }

  const success = hornsData => {
    console.log('got data', hornsData);
    addHorns(hornsData);
    addOptions(hornsData);
    addOptionsListeners(hornsData);
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
    const pageNum = $(event.target).data('page');
    console.log('clicking', pageNum);
    showPage(pageNum);
  });
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

//Runs page
$(startApp);

