//http://127.0.0.1:5500/index.html

function toggleDarkMode() {
  document.body.classList.toggle('dark_light-mode');
}

function switchSite(site) {
  window.location.href = site;
}



function makeEntry(name, plattform,rCode,releaseDate,id,done,infotext) {
    return {
      name: name,
      plattform: plattform,
      rCode:rCode,
      releaseDate: releaseDate, 
      id:id,
      done:done,
      infotext:infotext,

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


//test.push(makeEntry("Terranigma", "SNES",1996,game.length)); 
//game.push(makeEntry("Super Mario World", "SNES",1991,game.length)); 
//game.push(makeEntry("Secret of Mana", "SNES",1993,game.length));
//game.push(makeEntry("Secret of Evermore", "SNES",1993,game.length));
//game.push(makeEntry("Final Fantasy 7", "Playstation",1997,game.length));

//---------------------------------------------------------------------------


    //---------------------------------------------------------------------------




    




