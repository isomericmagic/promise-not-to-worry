// begin screener code
const returnValues = [
  "Hakuna",
  "Matata",
  "It means",
  "No worries",
  "For the rest of your days"
].sort(() => (Math.random() > 0.5 ? 1 : -1));
const createService = (retVal, index) => () =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log(`${index}. ${retVal}`);
      resolve(retVal);
    }, Math.random() * 10000)
  );
const services = returnValues.map(createService);
// end screener code

// begin my shenanigans / wrap everything in a function so we wait for the page to load before trying to do stuffs
document.addEventListener("DOMContentLoaded", function(){
	//add html elements for each pending return value 
	const body = document.getElementsByTagName("body")[0];
	let firstDiv = document.createElement("div");
	firstDiv.id = "lineStatus";
	firstDiv.appendChild(document.createTextNode("LINE STATUS"));
	body.appendChild(firstDiv);

	//find out how many items are in returnValues array
	let number_of_lines = returnValues.length;

	//loop over length of returnValues and add 'pending' lines for each value
	for (let i = 1; i <= number_of_lines; i++) {
	  let line = document.createElement("div");
	  line.id = `line${i}`;
	  line.appendChild(document.createTextNode(`Line ${i} pending...`));
	  firstDiv.appendChild(line);
	}

	//call services and update line items when promises are resolved
	services.forEach(service => {
	  x = service();
	  line_num = 1;
	  x.then(function(value) {
	    selector = document.getElementById("line"+line_num.toString());
	    selector.innerHTML = value;
	    line_num += 1;
	    return value;
	  });
	});
});