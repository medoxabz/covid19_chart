
let sidebar=document.querySelector(".content_side");
const ctx = document.getElementById('myChart');




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


            element.addEventListener("click",()=>{
              let newXhr=new XMLHttpRequest();
              newXhr.open("Get","https://api.covid19api.com/dayone/country/"+data[i]["ISO2"],true);
              if(newXhr.status==200 && newXhr.readyState==4){
                let res = JSON.parse(newXhr.response);
                console.log(res);
              }
            });
            
        };
        
    }
}
xhr.send();


        new Chart(ctx, {
          type: 'line',
          data: {
           
          
          },
          options: {
           
          }
        });











