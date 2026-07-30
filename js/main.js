let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Crear nuevo elemento de audio
let curr_track = document.createElement('audio');

// Define las pistas que se deben reproducir
let track_list = [
	{
		name: "Feliz Navidad",
		artist: "Diciembre 2025 (a)",
		image: "img/feliz-navidad.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Feliz Navidad.mp3"
	},
	{
		name: "Aquí estaré",
		artist: "Diciembre 2025 (b)",
		image: "img/aqui-estare.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Aquí estaré.mp3"
	},
	{
		name: "Maravillosa y lejana",
		artist: "Noviembre 2025 (a)",
		image: "img/maravillosa-y-lejana.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Maravillosa y lejana.mp3"
	},
	{
		name: "Desde dentro",
		artist: "Noviembre 2025 (b)",
		image: "img/desde-dentro.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Desde dentro.mp3"
	},
	{
		name: "Niña de mis besos",
		artist: "Octubre 2025 (a)",
		image: "img/niña-de-mis-besos.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Niña de mis besos.mp3"
	},
	{	
		name: "No sé",
    artist: "Octubre 2025 (b)",
    image: "img/no-se.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/No sé.mp3"
  },
  {
    name: "Amor inolvidable",
    artist: "Septiembre 2025 (a)",
    image: "img/amor-inolvidable.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Amor inolvidable.mp3"
  },
	{
		name: "Nunca he tenido",
		artist: "Septiembre 2025 (b)",
		image: "img/nunca-he-tenido.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Nunca he tenido.mp3"
	},
  {
    name: "Como poder olvidarte",
    artist: "Agosto 2025 (a)",
    image: "img/como-poder-olvidarte.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Como poder olvidarte.mp3"
  },
  {
    name: "Volvimos a encontrarnos",
    artist: "Agosto 2025 (b)",
    image: "img/volvimos-a-encontrarnos.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Volvimos a encontrarnos.mp3"
  },
	{
		name: "Manifiesto",
		artist: "Julio 2025 (a)",
		image: "img/manifiesto.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Manifiesto.mp3"
	},
	{
		name: "Destinados a no ser",
		artist: "Julio 2025 (b)",
		image: "img/destinados-a-no-ser.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Destinados a no ser.mp3"
	},
  {
    name: "Solo a ti",
    artist: "Junio 2025 (a)",
    image: "img/solo-a-ti.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Solo a ti.mp3"
  },
  {
    name: "Paz al partir",
    artist: "Junio 2025 (b)",
    image: "img/paz-al-partir.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Paz al partir.mp3"
  },
  {
    name: "I Want To Know What Love Is",
    artist: "Foreigner",
    image: "img/I-Want-To-Know-What-Love-Is.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/I Want To Know What Love Is.mp3"
  },
];

function random_bg_color() {

  // Obtenga un número entre 124 y 224 (para obtener colores más claros)
  let red = Math.floor(Math.random() * 224) + 124;
  let green = Math.floor(Math.random() * 224) + 124;
  let blue = Math.floor(Math.random() * 224) + 124;

  // Construye un color con los valores dados
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Establezca el fondo en ese color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = (track_index + 1) + " / " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);    
	curr_track.addEventListener("ended", playTrack);
	random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Cargar la primera pista en la lista de pistas
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) {
		playTrack();
  } else {
		pauseTrack();
	}
}

const reproducir = "svg/play.svg";
const pausar = "svg/pause.svg";

function playTrack() {
  curr_track.play();
  isPlaying = true;
	document.getElementById('iconoControl').src = pausar;
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
	document.getElementById('iconoControl').src = reproducir;
}

function nextTrack() {
  if (track_index < track_list.length - 1) {
		track_index += 1;
  } else { 
		track_index = 0;
	}
	loadTrack(track_index);
	document.getElementById('iconoControl').src = reproducir;
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
		track_index = track_list.length - 1;
	}
	loadTrack(track_index);
	document.getElementById('iconoControl').src = reproducir;
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


