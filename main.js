//http://127.0.0.1:5500/index.html

function toggleDarkMode() {
  document.body.classList.toggle('dark_light-mode');
}

function switchSite(site) {
  window.location.href = site;
}



function makeEntry(name, plattform,rCode,releaseDate,id,done,infotext,reihe) {
    return {
      name: name,
      plattform: plattform,
      rCode:rCode,
      releaseDate: releaseDate, 
      id:id,
      done:done,
      infotext:infotext,
      reihe:reihe,

    };
  }
  
let game=[];
let wishlist=[];


const regionCode=
[
  "Pal",      // 0
  "NTSC-US",  // 1
  "NTSC-J",   // 2
  "N/A"       // 3
];

let UniquePlatforms= new Set();

let UniqueReihe= new Set();

//test.push(makeEntry("Terranigma", "SNES",1996,game.length)); 
//game.push(makeEntry("Super Mario World", "SNES",1991,game.length)); 
//game.push(makeEntry("Secret of Mana", "SNES",1993,game.length));
//game.push(makeEntry("Secret of Evermore", "SNES",1993,game.length));
//game.push(makeEntry("Final Fantasy 7", "Playstation",1997,game.length));
-
//---------------------------------------------------------------------------


createList();
//createListFromCSV();

function createListFromCSV ()
{
  // Schritt 1: Exportiere die Daten aus Access in eine CSV-Datei

  // Schritt 2: Verwende JavaScript, um die CSV-Datei zu laden und zu parsen
  // Lade die CSV-Datei
  // Fetch-Anfrage, um die Textdatei zu laden
  fetch('Sammlung.txt')
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

      const tableElem = document.getElementById("searchResults");
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

      game.forEach(element => {
        UniqueReihe.add(element.reihe);
      });

      var reiheLinksContainer = document.getElementById("reiheLinks");
      UniqueReihe.forEach(platform => {
          var link = document.createElement("a");
          link.href = "#"; 
          link.textContent = platform+" ";

          link.style.marginRight = "10px";
      
          link.addEventListener("click", function(event) {
            const tableElem = document.getElementById("searchResults");
           tableElem.innerHTML = updateSearchTable(platform, game, 1);
        });
        reiheLinksContainer.appendChild(link);
      });

      //---------------------------------------------------

    })
    .catch(error => console.error('Fehler beim Laden der Textdatei:', error));


  }
 
    //---------------------------------------------------------------------------

 

function createList() 
{

    fetch('spiele.json')
    .then(response => response.json())
    .then(data => 
      {
        // Die Daten in das 'games'-Array einfügen
        game = data.map(game => makeEntry(
          game.name, 
          game.plattform,
          game.rCode, 
          game.releaseDate,
          game.id, 
          game.done,
          game.infotext
           ));

        // Jetzt sind die Daten aus der JSON-Datei in das 'games'-Array integriert
        console.log(game);

        // Hier könntest du weitere Aktionen mit den Daten durchführen oder die Tabelle aktualisieren
        const tableElem = document.getElementById("searchResults");
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
          game = sortEntriesByName(game);



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

      }
    )
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
    
};






//Dark_Light-Mode On/Off
document.addEventListener('DOMContentLoaded', function(){
  var buttonToggleDarkLight = document.getElementById('dl-mode');
  buttonToggleDarkLight.addEventListener('click',function(){
    toggleDarkMode();    //alert('ping');
  })

  //Switch Seite 2
  var buttonSwitchSite2 = document.getElementById('site2');
  buttonSwitchSite2.addEventListener('click',function(){
    switchSite('index2.html');
  })

  var buttonSwitchSite3 = document.getElementById('timeL');
  buttonSwitchSite3.addEventListener('click',function(){
    switchSite('timeline.html');
  })

  // Alphabetische Suche
  for (let i = 97; i <= 122; i++) // ASCII-Werte für 'a' bis 'z'
  {  
    let currentChar = String.fromCharCode(i);

    let setSearchElement = document.getElementById('setSearchTerm_' + currentChar);

    // Überprüfe, ob das Element vorhanden ist
    if (setSearchElement) {
        setSearchElement.addEventListener('click', function() {
            const tableElem = document.getElementById("searchResults");
            tableElem.innerHTML = updateSearchTable(currentChar, game, 2);
        });
    }
  }




//Reset Searchterm
var searchTerm_Reset = document.getElementById('setSearchTerm_null');
searchTerm_Reset.addEventListener('click',function(){
  const tableElem = document.getElementById("searchResults");
  tableElem.innerHTML = updateSearchTable(null, game, 2);
})

  //Seite erstellen Anfang
  var testButton = document.getElementById('Create_Site');
  testButton.addEventListener('click', function() {
    var newPage = window.open('', '_blank');

    var styles = `
    <style>
    body {background-color: #333;color: #fff;}
    body.dark_light-mode {background-color: #fff;color: #000;}
    table, th, td {border:1px solid black;}
    #done{background-color: red;}
    .test{background-color: green;}
    </style>
    `;

    var tableCOntent = `

    <table id="deineTabelleID" class="table" style="width:100%">
    <thead>
        <tr>
            <th>Titel</th>
            <th>Plattform</th>
            <th>Region</th> 
            <th>Release</th> 
            <th>ID</th> 
            <!-- <th>Done</th> -->
            <th>Info Text</th> 

        </tr>
    </thead>
    <tbody id="searchResults">
    </tbody>
    </table>
    `;

    newPage.document.documentElement.innerHTML = `
    <html>
    <head>
    <title>Generierte Seite</title>
    `+styles+`
    </head>
    <body>
    <h1>Generierte Seite</h1>
    <button id="dl-mode">Dark/Light Mode umschalten</button>
    <button id="close">Close Site</button>
    `+ tableCOntent+` 
    </body>
    <script>

    </script>
    </html>
    `;

    const tableElem = newPage.document.getElementById("searchResults");
    let html = "";
    tableElem.innerHTML = updateSearchTable("NTSC-J",game,1);

    var dmMode = newPage.document.getElementById('dl-mode');
    dmMode.addEventListener('click',function(){
      newPage.document.body.classList.toggle('dark_light-mode');    //alert('ping');
    })

    var closeSite = newPage.document.getElementById('close');
    closeSite.addEventListener('click',function(){
      newPage.close();    //alert('ping');
    })
    //Seite erstellen Ende
  })

})


       
document.getElementById("searchField").addEventListener("input", (event) => update(event.target.value,game));
update("",game);