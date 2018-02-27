//adding event listner
document.querySelector('.get-jokes').addEventListener('click', getRandomJokes);


//function for generating a random number:
function getRandomJokes(e) {
  var number = document.getElementById('number').value;

  if (number) {
    console.log(number);

    //instantiating the xmlHTTPRequest object :
    const xhr = new XMLHttpRequest();

    xhr.open('GET',`http://api.icndb.com/jokes/random/${number}`,true);

    xhr.onload = function(){
      if(this.status === 200){
      var jokes = JSON.parse(this.responseText);
      //console.log(jokes);
      let output = '';

      //based on the request adding the required //li's to html:
      if(jokes.type === 'success'){
        clearFields('msg');
          jokes.value.forEach(function(joke){
            output += `<li>${joke.joke}</li>`
          });
          document.getElementById('number').value =''
      }else{
        
        output += '<li>SomeThing went wrong</li>' 
      }

      //setting the output to HTML
      document.querySelector('.jokes').innerHTML = output;
      }
    }

    xhr.send();

  } else {
    clearFields('jokes');
    
    document.querySelector('.msg').innerHTML = 'Please enter a number';
  }
  e.preventDefault();
}

//functon used just to clear the li and error //messages whenever neccessary
function clearFields(fields){
    if(fields === 'jokes'){
      document.querySelector('.jokes').innerHTML = ''
    }
    if(fields === 'msg'){
      document.querySelector('.msg').innerHTML = ''
    }
}