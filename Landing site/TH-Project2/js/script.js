/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/



//referencing the ul by it's class name
// referencing the list items inside the ul by their tag name
let studentList = document.querySelector(".student-list");
let students = studentList.querySelectorAll('li');

// loop through the number of students to get how many there are
let totalStudents=0;
  for(let i =0;i<students.length;i++){
    totalStudents+=1;
  }



//show page function that takes in a page, and a list as paramaters
//in this case our list will be our list of students, and the page will correspond
// to the page that the user is on.
const showPage = (list,page) => {
  for(var i=0;i<list.length;i++){
    if ((i >= page * 10 - 10) && (i < page * 10)) {
          list[i].style.display = 'block';
    }else{
          list[i].style.display ='none';
    }

}
}

//calling the show page function I put 1 since 1 will be the 1st page that loads
showPage(students, 1);

const appendPageLinks =(list)=>{

  let pages = Math.ceil(totalStudents/10);



  //creating a div element on the page
  div = document.createElement('div');
  div.className = 'pagination';
  const pageDiv = document.querySelector('.page');
  pageDiv.appendChild(div);

  // Create a ul to the 'pagination' div
  const ul = document.createElement('ul');
  div.appendChild(ul);

  // for loop to create a a new li and a tag with the corresponding page number.
  for (let i = 0; i < pages; i++) {
    const li = document.createElement('li');
    ul.appendChild(li);
    const anchor = document.createElement('a');
    anchor.textContent = i + 1;
    li.appendChild(anchor);

    //event listener for the div
    div.addEventListener('click', (event) => {
      //page will be receive whatever the user clicks
      //if the user clicks the link with 2, then page will be 2
      page = event.target.textContent;

      const anchorList = document.querySelectorAll('a'); // list of anchor tags
      // for loop to loop through a tags and remove the 'active' class.
      showPage(students,page);
      for (let i = 0; i < anchorList.length; i++) {
        anchorList[i].classList.remove('active');
        event.target.classList.add('active');
      }
    });
  }
}
appendPageLinks(students);
