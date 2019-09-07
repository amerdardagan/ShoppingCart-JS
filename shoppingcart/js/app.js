//variables
const courses = document.getElementById ('courses-list'),
      shoppingCartContent = document.querySelector ('#cart-content tbody');
      clearCartBtn = document.querySelector ('#clear-cart')


//event listeners
eventListeners ();

function eventListeners () {

    //when a new course is added
    courses.addEventListener ('click', addCourse);
    //when remove button is clicked
    shoppingCartContent.addEventListener ('click' , removeCourse )
    //clear the cart 8button)
    clearCartBtn.addEventListener ('click', clearCart);
    //Storage stays on Load (Document Ready)
    document.addEventListener ('DOMContentLoaded' , storageLoad);

};



//functions

function addCourse (e) {
    e.preventDefault ();
    //use delegation to find course added to shopping cart
    if (e.target.classList.contains ('add-to-cart')) {

    //reads the parent of add-to-cart button which is-card-e.target.parentElement.parentElement
    //why? because I want to have info on each course 
        const course = e.target.parentElement.parentElement
        //reads the course value
        getCourseInfo (course);

        console.log (e.target.classList)
    }

}



//reads the HTML info on selected course
function getCourseInfo (course) {
    //create an object with course data
    const courseCardInfo = {
        image: course.querySelector ('img').src,
        title: course.querySelector ('h4').textContent,
        price: course.querySelector ('.price span').textContent,
        id: course.querySelector ('a').getAttribute ('data-id') //uzima index ili broj kursa, trebać mi za class:remove
    }

    //insert into shopping cart
    addIntoCart (courseCardInfo);
}

//display the selected course in shopping cart
function addIntoCart (course) {
    //create a <tr> (table row)
    const row = document.createElement ('tr');

    //build a template
    row.innerHTML = `
    <tr> 
        <td>
            <img src = '${course.image}' width = 100>
        </td>

        <td>${course.title}</td>
        <td>${course.price}</td>

        <td> 
            <a href = "#" class = "remove" data-id = "${course.id}"> X </a> 
        </td>
    
    </tr>
    `;
    //add into shopping cart
    shoppingCartContent.appendChild (row);

    addIntoStorage (course);

}

 //remove course

 function removeCourse (e) {

    let course,
        courseid;

     if (e.target.classList.contains ('remove')) {
         e.target.parentElement.parentElement.remove ();
         course = e.target.parentElement.parentElement;
         courseid = course.querySelector ('a').getAttribute ('data-id');

         removeCoursefromLocalStorage (courseid)
     }


     //Remove from the Local Storage
     function removeCoursefromLocalStorage (courseid) {
         let values = getFromStorage ();
         //Loop through array and find the index to remove
         values.forEach (function (valueLS, index) {
             if (valueLS.id === courseid) {
                 values.splice (index, 1);
             }

             console.log (values)
            


         });



     }


     
 }

//clear cart
function clearCart () {
    //shoppingCartContent.innerHTML = '';
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild (shoppingCartContent.firstChild) //zato što obuhvata tbody 
    }

    clearFromStorage ();
}

function clearFromStorage () {
    localStorage.clear ();
};


function addIntoStorage (course) {
    let values = getFromStorage ();

    values.push (course);

    localStorage.setItem ('keys', JSON.stringify (values));


}

function getFromStorage () {
    const StorageKey = localStorage.getItem ('key');
    let values;
 
    if (StorageKey === null) {
        values = [];
    }else{
        values = JSON.parse (StorageKey);
    }
    return values;
}

function storageLoad () {
    let valuesLS = getFromStorage ();

    valuesLS.forEach (function (course) {
        //create a <tr> (table row)
    const row = document.createElement ('tr');

    //build a template
    row.innerHTML = `
    <tr> 
        <td>
            <img src = '${course.image}' width = 100>
        </td>

        <td>${course.title}</td>
        <td>${course.price}</td>

        <td> 
            <a href = "#" class = "remove" data-id = "${course.id}"> X </a> 
        </td>
    
    </tr>
    `;
    //add into shopping cart
    shoppingCartContent.appendChild (row);


    })

};