


document.addEventListener('DOMContentLoaded', function(){
  var buttonToggleDarkLight = document.getElementById('dl-mode');
  buttonToggleDarkLight.addEventListener('click',function(){
    toggleDarkMode();    //alert('ping');
  })

  var buttonSwitchSite2 = document.getElementById('site2');
  buttonSwitchSite2.addEventListener('click',function(){
    switchSite('index2.html');
  })

})

/*

// Erstelle ein neues Eintragsobjekt
var newEntry = {
    name: "name",
    platform: "platform",
    // ... (Weitere Eigenschaften entsprechend deiner Datenstruktur)
};

// Lade vorhandene Daten
fetch('spiele.json')
    .then(response => response.json())
    .then(existingData => {
        // Füge den neuen Eintrag zum Array hinzu
        existingData.push(newEntry);

        // Schreibe die aktualisierten Daten zurück in die JSON-Datei
        const fs = require('fs');
        fs.writeFileSync('spiele.json', JSON.stringify(existingData, null, 2));

        // Zeige eine Bestätigungsmeldung an (kann angepasst werden)
        alert('Eintrag wurde hinzugefügt!');

        // Nach dem Hinzufügen, lade die aktualisierten Daten erneut
        loadGameData();
    })
    .catch(error => console.error('Fehler beim Hinzufügen des Eintrags:', error));
*/

function sortEntriesByName(entries) {
  return entries.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // Nicht case-sensitive sortieren
    const nameB = b.name.toUpperCase();

    // Extrahiere Zahlen am Ende der Namen
    const numA = nameA.match(/\d*$/); // RegExp für Zahlen am Ende
    const numB = nameB.match(/\d*$/);

    // Vergleiche die Namen ohne die Zahlen am Ende
    const nameWithoutNumA = nameA.replace(/\d*$/, '').trim();
    const nameWithoutNumB = nameB.replace(/\d*$/, '').trim();

    if (nameWithoutNumA < nameWithoutNumB) {
      return -1;
    }
    if (nameWithoutNumA > nameWithoutNumB) {
      return 1;
    }

    // Wenn die Namen ohne Zahlen gleich sind, vergleiche die Zahlen am Ende
    return parseInt(numA) - parseInt(numB);
  });
}



fetch('spiele.json')
    .then(response => response.json())
    .then(data => {
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
    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
   
    function tableLine(iterater, tb) {  
      var col_;  
      if(tb[iterater].done) {col_='green'} else {col_='red'};
        return `<tr>          
        <td>${tb[iterater].name}</td> 
        <td>${tb[iterater].plattform}</td> 
        <td>${tb[iterater].rCode}</td> 
        <td>${tb[iterater].releaseDate}</td> 
        <td>${tb[iterater].id}</td>  
        <!-- <td style="background: ${col_}">${tb[iterater].done}</td>  -->
        <td>${tb[iterater].infotext}</td>    
            </tr>`

      }

      function updateSearchTable(searchTerm,_game) {

        let html = "";

        var searchMask = new RegExp(searchTerm,'i');

       
      
        for(let i =0; i<=_game.length-1;i++)
        {



          if(searchTerm)
          {
             if(
              searchMask.test(_game[i].name) 
              || searchMask.test(_game[i].plattform) 
              || searchMask.test(_game[i].rCode) 
              || searchMask.test(_game[i].releaseDate) 
              ) 
              { html+=tableLine(_game[i].id,_game);} 
          }
          else
          {  
             html+=tableLine(i,_game);
          }

 

        }

          return html;
      }



    function update(searchTerm,_game) {



      const tableElem = document.getElementById("searchResults");
      let html = "";


      
      tableElem.innerHTML = updateSearchTable(searchTerm,_game);
   
  

      
    
       
      }
      
       
      document.getElementById("searchField").addEventListener("input", (event) => update(event.target.value,game));
      update("",game);
     
  