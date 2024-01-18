var todoLists = {}//local storage'dan okuma

function writeToLocal() {
  localStorage.setItem('todos', JSON.stringify(todoLists))//local storage'a yazdırma
}

$(document).ready(function () //this code checks if there is data stored in the localStorage under the key 'todos'. If there is, it will parse the data and store it in the todoLists variable. If there isn't, it will set the todoLists variable to an empty object.
{
  var items = localStorage.getItem('todos')
  if (items) 
  {
    todoLists = JSON.parse(items)
  }

  render();//showing the output in the browser
  $(document).on('click', '#add-task-button', function () //#add-task-button id'sine click eventi ekleme
  {
    createTask();
  })

  $(document).on('click', '.todo-checkbox', function (event) {
    event.stopPropagation();//event'in diğer elementlere yayılmasını engeller
    checkTask($(this).parent());//parent'ı li olan elementi checkTask fonksiyonuna gönderir
  })

  $(document).on('click', '.trash-button', function (event) 
  {
    event.stopPropagation();
    delete todoLists[$(this).parent().parent().attr('data-name')]
    activeTab = 'members'
    render();
  })

  $(document).on('click', '.todo-item', function (el, val) {
    $(this).find('.todo-checkbox').attr('checked', !$(this).find('.todo-checkbox').attr('checked'))
    checkTask($(this));
  })

  $(document).on('keypress', '#add-task-input', function (e) //enter'a basınca task oluşturma
  {
    if (e.keyCode == 13) {
      createTask();
    }
  });

  $(document).on('keypress', '#new-list-input', function (e) //enter'a basınca liste oluşturma
  {
    if (e.keyCode == 13) //
    {
      createList()
    }
  });

  $('#new-list-button').click(function () 
  {
    $('#new-list-modal').show(); 
    $('#new-list-input').focus();
  })

  $('.cancel').click(function () {
    $('#new-list-modal').hide();
  })

  $('.create').click(function () {
    createList()
  })

  $('.project-members').click(function () {
    $('.right-panel').html(`<div class="projectmembers">
        <p id="star2">&#9734</p>
        <p>Project Members</p>
      </div>
      <div id="students">
        <div class="person">
          <img src="images/can.jpg">
          <div>
            <span>Mustafacan Daşdemir</span>
            <p>Id: 21903303</p>
            <p>Section: 2</p><br>
          </div>
        </div>
        <div class="person">
          <img src="images/ceren.jpeg">
          <div>
            <span>Ceren Koçak</span>
            <p>Id: 22103619</p>
            <p>Section: 2</p><br>
          </div>
        </div>
    
        <div class="person">
          <img src="./images/fettah.jpeg">
          <div>
            <span>Fettah Elçik</span>
            <p>Id: 21903182</p>
            <p>Section: 2</p><br>
          </div>
        </div>
        <div class="person">
          <img src="./images/sude.jpeg">
          <div>
            <span>Sude Ayaz</span>
            <p>Id: 22103619</p>
            <p>Section: 2</p>
          </div>
        </div>
    
      </div>`)
  })

  $(document).on('click', '#left-list li.list-item', function () {
    var name = $(this).attr('data-name');//data-name attribute'una sahip elementin değerini alır
    activeTab = name;
    render();//showing the output in the browser
  })

})

activeTab = 'members'//default olarak members ekranını gösterir

function render() 
{
  renderLists()
  if (activeTab === 'members') //members ekranı gösterilir
  {
    renderMembers()//showing the output in the browser
  }
  else {
    renderListScreen(activeTab)
    $('#add-task-input').focus();//inputa odaklanır
  }
  updateListCount()//list count'ları günceller
  writeToLocal()//local storage'a yazdırma
}

function renderLists() {
  $('#left-list').html('<li class="project-members">&#9734&nbsp;&nbsp;Project Members</li><hr/>')
  for (var listName of Object.keys(todoLists)) 
  {
    $('#left-list').append(` 
  <li class="list-item" data-name="${listName}"> 
  <div class="kare"></div>
  <span  style="font-size: 24px;" id="menu-icon">&#9776</span>
  <span class="list-item-name">${listName}</span>
  <div class="list-actions">
      <span class="trash-button">🗑</span>
      <span class="list-count" style="background-color: lightgray; border-radius:100% ;width:22px; text-align:center; margin-right:5px"></span>
    </div>
  </li>
  `)
  }
}

function renderListScreen(listName) //listName'e göre taskları gösterir
{
  var tasks = todoLists[listName];//listName'e göre taskları alır
  $('.right-panel').html(`<div>
        <h1 class="list-name" style="color: white"; margin-left: 70px; font-size: 32px;>${listName}</h1>
        <ul id="tasks-list">
            ${tasks.map(renderTaskTemplate)}
        </ul>
        <div class="last">
          <div style="position: relative ; margin-bottom: 40px; ">
          <button id="add-task-button" style ="width:40px; position:relative; background-color: transparent; left:50px; top:5px">
              <span style="font-size:32px;   color: #888;">+ </span>
            </button>
            <input type="text" id="add-task-input" placeholder="Add a task"; font-size: 24px; />
          </div>
        </div></div>`);
}

function renderTaskTemplate(task) 
{
  return `<li class="todo-item">
  <input type="checkbox" class="todo-checkbox" ${task.checked && 'checked'}/> <span ${task.checked && 'class="through"'}>${task.title}</span>
</li>`
}

function renderMembers() {
  $('.right-panel').html(`<div class="projectmembers">
        <p id="star2">&#9734</p>
        <p>Project Members</p>
      </div>
      <div id="students">
        <div class="person">
          <img src="images/can.jpg">
          <div>
            <span>Mustafacan Daşdemir</span>
            <p>Id: 21903303</p>
            <p>Section: 2</p><br>
          </div>
        </div>
        <div class="person">
          <img src="images/ceren.jpeg">
          <div>
            <span>Ceren Koçak</span>
            <p>Id: 22103619</p>
            <p>Section: 2</p><br>
          </div>
        </div>
    
        <div class="person">
          <img src="./images/fettah.jpeg">
          <div>
            <span>Fettah Elçik</span>
            <p>Id: 21903182</p>
            <p>Section: 2</p><br>
          </div>
        </div>
        <div class="person">
          <img src="./images/sude.jpeg">
          <div>
            <span>Sude Ayaz</span>
            <p>Id: 22103619</p>
            <p>Section: 2</p>
          </div>
        </div>
    
      </div>`)
}

function createList() {
  var listName = $('#new-list-input').val();//inputtan değeri alır
  if (listName) {
    todoLists[listName] = [];//listName'e göre boş bir array oluşturur
    $('#new-list-modal').hide();//modalı gizler
    activeTab = listName;
    render();
  }
}

//modal, kullanıcıya etkileşimli bir pencere veya diyalog kutusu sunan bir arayüz öğesidir.
//Modal pencereler, genellikle ek bilgi, onay, giriş veya kullanıcıya bir seçenek sunma amacıyla kullanılır. 


//sonradan değiştir
function updateListCount() {
  for (var listName of Object.keys(todoLists)) 
  {
    const count = todoLists[listName].filter(task => !task.checked).length;//checked olmayan taskları sayar (checked olanlar gösterilmez) ÖNEMLİ!!
    const $listCountSpan = $(`li[data-name='${listName}']`).find('span.list-count');//listName'e göre span'ı bulur 
    
    // Eğer count 0'dan büyükse görünürlüğü ayarla
    if (count > 0) {
        $listCountSpan.css("visibility", "visible");// 0'dan büyükse görünür yap
    } else {
        $listCountSpan.css("visibility", "hidden"); // 0 ise gizle
    }

    $listCountSpan.html(count);//count değerini span'a yazdırır
}
}

function createTask() {
  var title = $('#add-task-input').val();//inputtan değeri alır
  var listName = $('.list-name').html();//listName'e göre boş bir array oluşturur
  if (title) {
    todoLists[listName].push({ checked: false, title: title })//listName'e göre boş bir array oluşturur
    render();
    $('#add-task-input').val('')//inputu temizler (task ekledikten sonra) ÖNEMLİ!!
  }
}

function checkTask(li) 
{
  var span = $(li).find('span')
  $(span).toggleClass("through")
  var listName = $('.list-name').html()//listName'e göre boş bir array oluşturur
  var taskTitle = $(span).html()
  todoLists[listName] = todoLists[listName].map(task => 
     {
    if (taskTitle != task.title) return task;//taskTitle task.title'a eşit değilse task'ı döndür
    return { checked: !task.checked, title: taskTitle } 
  })
  render()
}

//toggle ,iki durum arasında geçiş yapmayı ifade eder. Bu, bir öğenin görünürlüğünü açmak veya kapatmak, bir durumu etkinleştirmek veya devre dışı bırakmak gibi iki farklı durum arasında geçiş yapmayı ifade eder. 
//"Toggle" fonksiyonları, belirli bir durumu değiştirmek veya tersine çevirmek için kullanılır.
