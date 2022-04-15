console.log('project library');
// constructor
function Book(author, bookName, category) {
    this.author = author;
    this.name = bookName;
    this.category = category;
}

// display function
function Display() {
}

Display.prototype.add=function(book){
    console.log('adding to');
    let tableBody=document.getElementById('tableBody');
    let addRow = ` <tr>
                        <td>${book.author}</td>
                        <td>${book.name}</td>
                        <td>${book.category}</td>
                    </tr>`;
    tableBody.innerHTML+= addRow;
}

Display.prototype.clear =function(){
    let form = document.getElementById('libraryForm');
    form.reset();
}
Display.prototype.validate= function(book){
    if(book.author.length<2 || book.name.length<2){
        return false;
    }
    else{
        return true;
    }
}
Display.prototype.show=function(type,displayMessage){
    let message=document.getElementById('message');
    message.innerHTML=`<div class="alert alert-${type} d-flex align-items-center" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    <div>
      ${displayMessage}
    </div>
  </div>`;
  setTimeout(() => {
      message.innerHTML='';
  }, 3000);
}


let form = document.getElementById('libraryForm');
form.addEventListener('submit', formSubmit);

function formSubmit(e){
    let author = document.getElementById('authorName').value;
    let name = document.getElementById('bookName').value;
    let type;
    let fiction = document.getElementById('fiction');
    let health = document.getElementById('health');
    let romance = document.getElementById('romance');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (health.checked) {
        type = health.value;
    }
    else if (romance.checked) {
        type = romance.value;
    }
    let book = new Book(author, name, type);
    let data=localStorage.getItem(book);
    if(data==null){ 
        dataObj=[];
     }  
     else{
        dataObj=JSON.parse(data);
    } 
    dataObj.push(book);
    localStorage.setItem('data',JSON.stringify(dataObj));
    console.log(book);

    // display object
    let display1 = new Display();
    if(display1.validate(book)){
        display1.add(book);
        display1.clear();
        display1.show('success','your book has been added');
    }
    else{
        display1.show('danger','sorry! you cannot add this book');
    }
    e.preventDefault();
}
