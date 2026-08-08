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
		name: "Tu nombre",
		artist: "Agosto 2026 (a)",
		image: "img/tu-nombre.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Tu nombre.mp3"
	},
	{
		name: "Triste es saber",
		artist: "Agosto 2026 (b)",
		image: "img/triste-es-saber.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Triste es saber.mp3"
	},
	{	
		name: "Te dejé ir",
    artist: "Julio 2026 (a)",
    image: "img/te-deje-ir.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Te dejé ir.mp3"
  },
	{
		name: "Ecos del pasado",
		artist: "Julio 2026 (b)",
		image: "img/ecos-del-pasado.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Ecos del pasado.mp3"
	},
	{
		name: "Lo siento amor",
		artist: "Junio 2026 (a)",
		image: "img/lo-siento-amor.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Lo siento amor.mp3"
	},
	{
		name: "Sombras de tu bienestar",
		artist: "Junio 2026 (b)",
		image: "img/sombras-de-tu-bienestar.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Sombras de tu bienestar.mp3"
	},
	{	
		name: "El primer amor nunca se va",
    artist: "Mayo 2026 (a)",
    image: "img/el-primer-amor-nunca-se-va.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/El primer amor nunca se va.mp3"
  },
	{
		name: "Cuán efímero es el amor",
		artist: "Mayo 2026 (b)",
		image: "img/cuan-efimero-es-el-amor.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Cuán efímero es el amor.mp3"
	},
	{
		name: "Te quise de verdad",
		artist: "Abril 2026 (a)",
		image: "img/te-quise-de-verdad.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Te quise de verdad.mp3"
	},
	{
		name: "Evocación",
		artist: "Abril 2026 (b)",
		image: "img/evocacion.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Evocación.mp3"
	},
	{
		name: "Otra vez Marzo",
		artist: "Marzo 2026 (a)",
		image: "img/otra-vez-marzo.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Otra vez Marzo.mp3"
	},
	{
		name: "Monse",
		artist: "Marzo 2026 (b)",
		image: "img/monse.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Monse.mp3"
	},
	{	
		name: "Si al menos",
    artist: "Febrero 2026 (a)",
    image: "img/si-al-menos.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Si al menos.mp3"
  },
	{
		name: "No me dejaste de gustar",
		artist: "Febrero 2026 (b)",
		image: "img/no-me-dejaste-de-gustar.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/No me dejaste de gustar.mp3"
	},
	{	
		name: "Ya no soy lo que fui",
    artist: "Enero 2026 (a)",
    image: "img/ya-no-soy-lo-que-fui.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
    path: "music/Ya no soy lo que fui.mp3"
  },
	{
		name: "Desde la distancia",
		artist: "Enero 2026 (b)",
		image: "img/desde-la-distancia.jpg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
		path: "music/Desde la distancia.mp3"
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
