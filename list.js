

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

      function updateSearchTable(searchTerm,_game,searchmethod) {
        var anzahl=0;
        const number = document.getElementById("anz");
        let html = "";
        var searchMask;
        if(searchmethod==0) //Beinhaltet Suchbegriff
        {     
          anzahl=0;
          searchMask = new RegExp(searchTerm,'i'); 
          for(let i =0; i<=_game.length-1;i++)
          {
            if(searchTerm)
            {
              if(
                searchMask.test(_game[i].name) 
                || searchMask.test(_game[i].plattform) 
                || searchMask.test(_game[i].rCode) 
                || searchMask.test(_game[i].releaseDate) 
                || searchMask.test(_game[i].reihe) 
                ) 
                {       
                  html+=tableLine(_game[i].id,_game);    
                  anzahl++;
                } 
            }
            else
            {  
              html+=tableLine(i,_game);
            }
          }
        }               
        else if(searchmethod==1) //Ist exakt Suchbegriff
        { 
          searchMask = new RegExp('^' + searchTerm + '$', 'i');
          for(let i =0; i<=_game.length-1;i++)
          {
            if(searchTerm)
            {
              if(
                searchMask.test(_game[i].name) 
                || searchMask.test(_game[i].plattform) 
                || searchMask.test(_game[i].rCode) 
                || searchMask.test(_game[i].releaseDate) 
                || searchMask.test(_game[i].reihe) 
                ) 
                {       
                  html+=tableLine(_game[i].id,_game);   
                  anzahl++; 
                } 
            }
            else
            {  
              html+=tableLine(i,_game);
            }
          }
        }  
        else if(searchmethod==2) //Nur Anfang
        {
          searchMask = new RegExp('^' + searchTerm, 'i');
          for (let i = 0; i <= _game.length - 1; i++) {
            if (searchTerm) {
                // Hier prüfen, ob der Name mit dem gewünschten Buchstaben beginnt
                if (searchMask.test(_game[i].name) && _game[i].name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                    html += tableLine(_game[i].id, _game);
                }
            } else {
                html += tableLine(i, _game);
                anzahl++;
            }
        }
        }
        console.log(anzahl);   
        number.innerHTML = "Anzahl: "+anzahl;
        return html;
      }



    function update(searchTerm,_game) {

      const tableElem = document.getElementById("searchResults");
      let html = ""; 
      tableElem.innerHTML = updateSearchTable(searchTerm,_game,0);


      }
      


    



  
  