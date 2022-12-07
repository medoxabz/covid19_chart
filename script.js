
let sidebar=document.querySelector(".content_side");
const ctx = document.getElementById('myChart');

function countryClicked(element){
  let code=element.target.getAttribute("id");
   let newXhr = new XMLHttpRequest();
   newXhr.open("Get","https://api.covid19api.com/dayone/country/"+ code,true);

   newXhr.onreadystatechange=()=>{
     if(newXhr.status==200 && newXhr.readyState==4){
    var res = JSON.parse(newXhr.response);
      console.log(res);
    let labels = res.map(e=>{
     let d=new Date(e.Date);
     day=d.getDate();
     month=d.getMonth()+1;
     return `${day}/${month}`;
    });

  
    let confirmed = res.map(e=>{return e.Confirmed});
    let recovered = res.map(e=>{return e.Recovered});
    let Active = res.map(e=>{return e.Active});
    
    let Deaths = res.map(e=>{return e.Deaths});
    let dataset=[
     {
         label:"confirmed",
         data:confirmed,
         borderColor:"red",
     },
     {
       label:"Recovered",
       data:recovered,
       borderColor:"blue",
     },
     {
      label:"Active",
      data:Active,
      borderColor:"green",
    },
    {
      label:"Deaths",
      data:Deaths,
      borderColor:"yellow",
    },
    ];
    myChart.data.labels=labels;
    myChart.data.datasets=dataset;
    myChart.update();
   
          }
   }
     newXhr.send();
   
 };


let xhr = new XMLHttpRequest();
xhr.open("Get","https://api.covid19api.com/countries",true);
xhr.onreadystatechange=()=>{
    if(xhr.status==200 && xhr.readyState==4){
        let data = JSON.parse(xhr.response);
        for(let i =0;i< data.length;i++) {
            let element=document.createElement("h1");
            let txt=document.createTextNode(`${data[i]["Country"]}`);
            element.setAttribute("id",data[i]["ISO2"]);
            element.appendChild(txt);
            element.classList.add("country");
            sidebar.appendChild(element);

          

            element.addEventListener("click",countryClicked);
            
        };
        
    }
}
xhr.send();


    var myChart= new Chart(ctx, {
          type: 'line',
          data: {
           labels:[],
           datasets:[]
          
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });











