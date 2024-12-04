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


//createList();
createListFromCSV();

function createList() 
{

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
}


function createListFromCSV ()
{
  // Schritt 1: Exportiere die Daten aus Access in eine CSV-Datei

  // Schritt 2: Verwende JavaScript, um die CSV-Datei zu laden und zu parsen
  // Lade die CSV-Datei
  // Fetch-Anfrage, um die Textdatei zu laden
  fetch('Wishlist.txt')
    .then(response => response.text())
    .then(dataText => {
      // Schritt 1: Die Textdatei in Zeilen aufteilen
      const rows = dataText.split('\n');

      // Schritt 2: Die Zeilen parsen und in ein JavaScript-Array konvertieren
      const dataArray = rows.map(row => {
        const columns = row.split(';').map(column => column.replace(/"/g, '')); // Spalten trennen und Anführungszeichen entfernen
        return {
          id: parseInt(columns[0]), // ID in Zahl umwandeln
          name: columns[1], // Name
          plattform: columns[2], // Plattform
          rCode: columns[3], // Status
          releaseDate: columns[4],
          reihe: columns[5],
          done: columns[6],
          infotext: columns[7]
          
        };
      });

      game = dataArray.map(data => {
        return makeEntry(
          data.name, 
          data.plattform, 
          data.rCode, 
          data.releaseDate, 
          data.id, 
          data.done, 
          data.infotext,
          data.reihe);
      });
      // Schritt 3: Verarbeite das JavaScript-Array weiter oder verwende es in deinem Code
      console.log(game);

      const tableElem = document.getElementById("searchResults2");
      let html = "";

      for(let i =0; i<=game.length-1;i++){
      
      // ReginCode anpassen
        if(game[i].rCode=="0") game[i].rCode=regionCode[0];
        else if(game[i].rCode=="1") game[i].rCode=regionCode[1];
        else if(game[i].rCode=="2") game[i].rCode=regionCode[2];
        else if(game[i].rCode=="3") game[i].rCode=regionCode[3];

        // IDs neu vergeben
        game[i].id=i;

        // Daten nach dem Namen sortieren
        //game = sortEntriesByName(game);



      html+=tableLine(i,game);
      }
      tableElem.innerHTML = html;

        //Erzeuge Plattform-Suchbegriffe
        // ----------------------------------------------------
        game.forEach(element => {
          UniquePlatforms.add(element.plattform);
        });

        var platformLinksContainer = document.getElementById("platformLinks");
        UniquePlatforms.forEach(platform => {
            var link = document.createElement("a");
            link.href = "#"; 
            link.textContent = platform+" ";

            link.style.marginRight = "10px";
        
            link.addEventListener("click", function(event) {
              const tableElem = document.getElementById("searchResults");
              tableElem.innerHTML = updateSearchTable(platform, game, 1);
          });
            platformLinksContainer.appendChild(link);
        });

        //console.log(Array.from(UniquePlatforms)[1]);

        //--------------------------------------------------
      
        //Erzeuge RegionCodes Suchbegriffe
        //--------------------------------------------------
        var codes = document.getElementById("Rcodes");
        regionCode.forEach(platform => {
            var link = document.createElement("a");
            link.href = "#"; 
            link.textContent = platform+" ";

            link.style.marginRight = "10px";
        
            link.addEventListener("click", function(event) {
              const tableElem = document.getElementById("searchResults");
              tableElem.innerHTML = updateSearchTable(platform, game, 1);
          });
            codes.appendChild(link);
        });
      //--------------------------------------------------

    })
    .catch(error => console.error('Fehler beim Laden der Textdatei:', error));


  }





  function tableLine(iterater, tb) {  
    var col_;  
    if(tb[iterater].done) {col_='green'} else {col_='red'};
      return `<tr>        
      <td>${tb[iterater].id}</td>   
      <td>${tb[iterater].name}</td> 
      <td>${tb[iterater].plattform}</td> 
      <td>${tb[iterater].rCode}</td> 
      <td>${tb[iterater].releaseDate}</td>     
      <td>${tb[iterater].reihe}</td>  
      <!-- <td style="background: ${col_}">${tb[iterater].done}</td>  -->
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