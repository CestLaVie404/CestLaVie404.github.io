document.addEventListener('DOMContentLoaded', function(){
  var buttonToggleDarkLight = document.getElementById('dl-mode');
  buttonToggleDarkLight.addEventListener('click',function(){
    toggleDarkMode();    //alert('ping');
  })

  var buttonSwitchSite1 = document.getElementById('site1');
  buttonSwitchSite1.addEventListener('click',function(){
    switchSite('index.html');
  })

})


fetch('wishlist.json')
.then(response => response.json())
.then(data => {
    // Die Daten in das 'games'-Array einfügen
    wishlist = data.map(wishlist => makeEntry(
      wishlist.name, 
      wishlist.plattform,
      wishlist.rCode, 
      wishlist.releaseDate, 
      wishlist.id, 
      wishlist.infotext
      ));

    // Jetzt sind die Daten aus der JSON-Datei in das 'games'-Array integriert
    console.log(wishlist);

    // Hier könntest du weitere Aktionen mit den Daten durchführen oder die Tabelle aktualisieren
    const tableElem = document.getElementById("searchResults2");
    let html = "";
    for(let i =0; i<=wishlist.length-1;i++){
    
     // RegionCode anpassen
      if(wishlist[i].rCode=="0") wishlist[i].rCode=regionCode[0];
      else if(wishlist[i].rCode=="1") wishlist[i].rCode=regionCode[1];
      else if(wishlist[i].rCode=="2") wishlist[i].rCode=regionCode[2];
      else if(wishlist[i].rCode=="3") wishlist[i].rCode=regionCode[3];

      // IDs neu vergeben
      wishlist[i].id=i;
      

    html+=tableLine(i,wishlist);
    }
    tableElem.innerHTML = html;
})
.catch(error => console.error('Fehler beim Abrufen der Daten:', error));

function tableLine(iterater, tb) {  
 
    return `<tr>          
    <td>${tb[iterater].name}</td> 
    <td>${tb[iterater].plattform}</td> 
    <td>${tb[iterater].rCode}</td> 
    <td>${tb[iterater].releaseDate}</td> 
    <td>${tb[iterater].id}</td>      
    <td>${tb[iterater].infotext}</td> 
        </tr>`
  }

function updateSearchTable(searchTerm,tb) {

    
    const tableElem = document.getElementById("searchResults2");
    let html = "";
  
    var searchMask = new RegExp(searchTerm,'i');
  
    for(let i =0; i<=wishlist.length-1;i++){
      if(searchTerm){
         if(
          searchMask.test(wishlist[i].name) 
          || searchMask.test(wishlist[i].plattform) 
          || searchMask.test(wishlist[i].rCode) 
          || searchMask.test(wishlist[i].releaseDate) 
          ) 
              { html+=tableLine(wishlist[i].id,wishlist);} 
      }
      else{  
          html+=tableLine(i,wishlist);
      }
      }
  
    tableElem.innerHTML = html;
  
   
  }

 
document.getElementById("searchField2").addEventListener("input", (event) => updateSearchTable(event.target.value),wishlist);
updateSearchTable("",wishlist);