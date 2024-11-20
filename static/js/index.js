window.HELP_IMPROVE_VIDEOJS = false;


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
    // Synchronization variables
    let video1Ready = false;
    let video2Ready = false;

    // Set initial position for labels (50/50 split)
    labelTop.style.opacity = "1";
    labelBottom.style.opacity = "1";

    // Pause videos on hover
    videoContainer.addEventListener("mouseenter", () => {
      video1.pause();
      video2.pause();
    });

    // Resume videos on leave
    videoContainer.addEventListener("mouseleave", () => {
      video1.play();
      video2.play();
    });

    // Move the slider dynamically and adjust label visibility
    videoContainer.addEventListener("mousemove", (event) => {
      const rect = videoContainer.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));

      // Update slider position and video clipping
      video2Wrapper.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      slider.style.left = `${percentage}%`;

      // Adjust label visibility
      const labelOpacityTop = percentage / 100; // Top label fades as slider moves right
      const labelOpacityBottom = 1 - percentage / 100; // Bottom label fades as slider moves left

      labelTop.style.opacity = labelOpacityTop.toFixed(2);
      labelBottom.style.opacity = labelOpacityBottom.toFixed(2);
    });


})
