window.HELP_IMPROVE_VIDEOJS = false;


function sleepSync(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy-waiting: do nothing, just wait for the time to pass
  }
}

$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }
    bulmaSlider.attach();

    // carousel for the video
    var video_id_list = [
      "mipnerf360_bicycle",
      "mipnerf360_stump",
      "mipnerf360_counter",
      "mipnerf360_treehill",
      "mipnerf360_garden",
      "tandt_db_train",
      "tandt_db_truck",
      "tandt_db_drjohnson",
      "custom_children_art",
      "custom_flower_gallery",
      "blender_chair",
      "blender_lego",
      "blender_ship",
    ];
    for (var i = 0; i < video_id_list.length; i++) {
        let video_element = document.getElementById(video_id_list[i]);
        // console.log(video_element);
        video_element.addEventListener('mouseenter', () => {
          video_element.pause();
        });

        // Play the video when the mouse leaves
        video_element.addEventListener('mouseleave', () => {
          video_element.play();
        });
    }


    // teaser
    const videoContainer = document.querySelector(".teaser-video-container");
    const video2Wrapper = document.getElementById("teaser-video2-wrapper");
    const slider = document.getElementById("teaser-slider");
    const video1 = document.getElementById("teaser-video1");
    const video2 = document.getElementById("teaser-video2");
    const labelTop = document.getElementById("teaser-label-top");
    const labelBottom = document.getElementById("teaser-label-bottom");

    // Set initial position for labels (50/50 split)
    labelTop.style.opacity = "1";
    labelBottom.style.opacity = "1";

    // Pause videos on hover
    videoContainer.addEventListener("mouseenter", () => {
      syncVideos();
      video1.pause();
      video2.pause();
    });

    // Resume videos on leave
    videoContainer.addEventListener("mouseleave", () => {
      syncVideos();
      video1.play();
      video2.play();
    });


    // Sync settings
    const syncThreshold = 0.01; // Allowable time difference (in seconds) for sync tolerance

    // Function to check and sync videos
    function syncVideos() {
      // console.log("syncing videos...");
      const video1Time = video1.currentTime;
      const video2Time = video2.currentTime;
      // If the videos are out of sync beyond the threshold
      if (Math.abs(video1Time - video2Time) > syncThreshold) {
        // Sync video2 to video1's time (or vice versa, depending on which you want to prioritize)
        console.log("actually syncing videos...");
        video2.currentTime = video1Time;
      }
    }

    // Polling mechanism to check sync every 50ms (20 times per second)
    setInterval(syncVideos, 10);

    // Move the slider dynamically and adjust label visibility
    videoContainer.addEventListener("mousemove", (event) => {
      const rect = videoContainer.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

      // Update slider position and video clipping
      video2Wrapper.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      slider.style.left = `${percentage}%`;

      // Hide the labels when the slider reaches their edges
      if (percentage <= 10) {
        labelTop.style.display = 'none';  // Hide top label when slider reaches 90%
      } else {
        labelTop.style.display = 'block'; // Show top label when slider moves away
      }

      if (percentage >= 90) {
        labelBottom.style.display = 'none';  // Hide bottom label when slider reaches 10%
      } else {
        labelBottom.style.display = 'block'; // Show bottom label when slider moves away
      }

      syncVideos();
    });
})


// supplemental materials
let currentScene = 'mipnerf360-bicycle';
let currentModel = '3DGS';
let currentTimeVaryGaussians = 0;
let videoPaused = false;

let currentSceneDecomp = 'mipnerf360-bicycle';
let currentTexDecomp = 'none';
let currentColorDecomp = 'base';
let currentTimeColorDecomp = 0;
let videoPausedDecomp = false;


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("video-vary-gaussians").addEventListener('pause', () => {
    console.log("pause video");
    videoPaused = true;
  });
  document.getElementById("video-vary-gaussians").addEventListener('play', () => {
    videoPaused = false;
  });
  document.getElementById("video-color-decomp").addEventListener('pause', () => {
    console.log("pause video");
    videoPausedDecomp = true;
  });
  document.getElementById("video-color-decomp").addEventListener('play', () => {
    videoPausedDecomp = false;
  });
  currentTimeVaryGaussians = document.getElementById('video-vary-gaussians').currentTime;
  currentTimeColorDecomp = document.getElementById('video-color-decomp').currentTime;
});

// Varying number of Gaussians

function selectScene(scene) {
  document.querySelectorAll('[id^="scene-button"]').forEach(button => button.classList.remove('is-active'));
  document.getElementById(`scene-button-${scene}`).classList.add('is-active');
  currentScene = scene;
  updateColorVaryVideo();
}

function selectModel(model) {
  document.querySelectorAll('#model-button-3dgs, #model-button-ours').forEach(button => button.classList.remove('is-active'));
  if (model === '3DGS') {
    document.getElementById('model-button-3dgs').classList.add('is-active');
  } else {
    document.getElementById('model-button-ours').classList.add('is-active');
  }
  currentModel = model;
  updateColorVaryVideo();
}

function updateColorVarySlider() {
  let sliderValues = ['1', '2', '5', '10', '20', '50', '100'];
  currentValue = parseInt(document.getElementById('slider').value);
  document.getElementById('slider-value').innerHTML = "Percentage of Gaussians: " + sliderValues[currentValue - 1] + "%";
  updateColorVaryVideo()
}

function updateColorVaryVideo() {
  let sliderValues = ['1', '2', '5', '10', '20', '50', '100'];
  currentValue = parseInt(document.getElementById('slider').value);
  let videoName = `${currentScene}_${currentModel}_${sliderValues[currentValue - 1]}.mp4`;
  document.getElementById('video-source-vary-gaussians').src = `./static/videos/supp/${videoName}`;
  currentTimeVaryGaussians = document.getElementById('video-vary-gaussians').currentTime;
  document.getElementById('video-vary-gaussians').load();
  document.getElementById('video-vary-gaussians').currentTime = currentTimeVaryGaussians;
  if(videoPaused){
    document.getElementById('video-vary-gaussians').pause();
  } else {
    document.getElementById('video-vary-gaussians').play();
  }
}

// Color component decomposition
function selectSceneDecomp(scene) {
  document.querySelectorAll('[id^="scene-decomp-button"]').forEach(button => button.classList.remove('is-active'));
  document.getElementById(`scene-decomp-button-${scene}`).classList.add('is-active');
  currentSceneDecomp = scene;
  updateColorDecompVideo();
}


function selectTexDecomp(texture) {
  document.querySelectorAll('#decomp-tex-button-none, #decomp-tex-button-alpha, #decomp-tex-button-rgb, #decomp-tex-button-rgba').forEach(button => button.classList.remove('is-active'));
  document.getElementById(`decomp-tex-button-${texture}`).classList.add('is-active');
  currentTexDecomp = texture;
  updateColorDecompVideo();
}

function selectColorDecomp(color) {
  document.querySelectorAll('#decomp-color-button-base, #decomp-color-button-tex, #decomp-color-button-final').forEach(button => button.classList.remove('is-active'));
  document.getElementById(`decomp-color-button-${color}`).classList.add('is-active');
  currentColorDecomp = color;
  updateColorDecompVideo();
}


function updateColorDecompVideo() {
  let videoNameSuffix = currentColorDecomp;
  if (currentColorDecomp == "final"){
    if(currentTexDecomp == "none" || currentTexDecomp == "alpha"){
      videoNameSuffix = "base";
    }
  }
  let videoName = `${currentSceneDecomp}_${currentTexDecomp}_${videoNameSuffix}.mp4`;
  //console.log(videoName);
  currentTimeColorDecomp = document.getElementById('video-color-decomp').currentTime;
  document.getElementById('video-source-color-decomp').src = `./static/videos/supp/${videoName}`;
  document.getElementById('video-color-decomp').load();
  document.getElementById('video-color-decomp').currentTime = currentTimeColorDecomp;
  //document.getElementById('video-name-color-decomp').innerHTML = videoName;
  if(videoPausedDecomp){
    document.getElementById('video-color-decomp').pause();
  } else {
    document.getElementById('video-color-decomp').play();
  }
}
