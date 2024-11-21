let currentScene = 'mipnerf360-kitchen';
let currentModel = '3DGS';
let currentTimeVaryGaussians = 0;

let currentTextureAblationScene = 'mipnerf360-kitchen';
let currentTexture = 'none';
let currentTimeTextureAblation = 0;

let currentSceneDecomp = 'mipnerf360-kitchen';
let currentTexDecomp = 'none';
let currentColorDecomp = 'base';
let currentTimeColorDecomp = 0;

let currentSceneVaryNumGSFixTexRes = 'mipnerf360-kitchen';
let currentValueVaryNumGSFixTexRes = 1;
let currentTimeVaryNumGSFixTexRes = 0;

let currentSceneVaryTexResFixNumGS = 'mipnerf360-kitchen';
let currentValueVaryTexResFixNumGS = 1;
let currentTimeVaryTexResFixNumGS = 0;

window.onload = function() {
    currentTimeVaryGaussians = document.getElementById('video-vary-gaussians').currentTime;
    currentTimeTextureAblation = document.getElementById('video-tex-ablation').currentTime;
    currentTimeColorDecomp = document.getElementById('video-color-decomp').currentTime;
};

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

function updateColorVaryVideo() {
  let sliderValues = ['1', '2', '5', '10', '20', '50', '100'];
  currentValue = parseInt(document.getElementById('slider').value);
  let videoName = `${currentScene}_${currentModel}_${sliderValues[currentValue - 1]}.mp4`;
  document.getElementById('video-source-vary-gaussians').src = `./static/videos/num_gs/${videoName}`;
  currentTimeVaryGaussians = document.getElementById('video-vary-gaussians').currentTime;
  document.getElementById('video-vary-gaussians').load();
  document.getElementById('video-vary-gaussians').currentTime = currentTimeVaryGaussians;
  //document.getElementById('video-name-vary-gaussians').innerHTML = videoName;
  document.getElementById('slider-value').innerHTML = "Percentage of Gaussians: " + sliderValues[currentValue - 1] + "%";
}


// Vary Number of Gaussians with Fixed Texture Resolution
function selectVaryNumGSFixTexResScene(scene) {
  document.querySelectorAll('#scene-vary-num-gs-fix-tex-res-button-mipnerf360-kitchen, #scene-vary-num-gs-fix-tex-res-button-mipnerf360-bicycle, #scene-vary-num-gs-fix-tex-res-button-mipnerf360-stump, #scene-vary-num-gs-fix-tex-res-button-custom-flower_gallery, #scene-vary-num-gs-fix-tex-res-button-custom-children_art').forEach(button => button.classList.remove('is-active'));
  document.getElementById(`scene-vary-num-gs-fix-tex-res-button-${scene}`).classList.add('is-active');
  currentSceneVaryNumGSFixTexRes = scene;
  updateVaryNumGSFixTexResVideo();
}

function updateVaryNumGSFixTexResVideo() {
  let sliderValues = ['1', '2', '5', '10', '20', '50', '100'];
  currentValueVaryNumGSFixTexRes = parseInt(document.getElementById('vary-num-gs-fix-tex-res-slider').value);
  let videoName = `${currentSceneVaryNumGSFixTexRes}_${sliderValues[currentValueVaryNumGSFixTexRes - 1]}.mp4`;
  document.getElementById('video-source-vary-num-gs-fix-tex-res').src = `./static/videos/fix_tex_res_vary_num_gs/${videoName}`;
  currentTimeVaryNumGSFixTexRes = document.getElementById('video-vary-num-gs-fix-tex-res').currentTime;
  document.getElementById('video-vary-num-gs-fix-tex-res').load();
  document.getElementById('video-vary-num-gs-fix-tex-res').currentTime = currentTimeVaryNumGSFixTexRes;
  //document.getElementById('video-name-vary-gaussians').innerHTML = videoName;
  document.getElementById('vary-num-gs-fix-tex-res-slider-value').innerHTML = "Percentage of Gaussians: " + sliderValues[currentValueVaryNumGSFixTexRes - 1] + "%";
}

// Vary Number of Gaussians with Fixed Texture Resolution
function selectVaryTexResFixNumGSScene(scene) {
  document.querySelectorAll('#scene-vary-tex-res-fix-num-gs-button-mipnerf360-kitchen, #scene-vary-tex-res-fix-num-gs-button-mipnerf360-bicycle, #scene-vary-tex-res-fix-num-gs-button-mipnerf360-stump, #scene-vary-tex-res-fix-num-gs-button-custom-flower_gallery, #scene-vary-tex-res-fix-num-gs-button-custom-children_art').forEach(button => button.classList.remove('is-active'));
  document.getElementById(`scene-vary-tex-res-fix-num-gs-button-${scene}`).classList.add('is-active');
  currentSceneVaryTexResFixNumGS = scene;
  updateVaryTexResFixNumGSVideo();
}

function updateVaryTexResFixNumGSVideo() {
  let sliderValues = [2, 5, 10, 20, 30, 40];
  currentValueVaryTexResFixNumGS = parseInt(document.getElementById('vary-tex-res-fix-num-gs-slider').value);
  let videoName = `${currentSceneVaryTexResFixNumGS}_${sliderValues[currentValueVaryTexResFixNumGS - 1]}.mp4`;
  document.getElementById('video-source-vary-tex-res-fix-num-gs').src = `./static/videos/fix_num_gs_vary_tex_res/${videoName}`;
  currentTimeVaryTexResFixNumGS = document.getElementById('video-vary-tex-res-fix-num-gs').currentTime;
  document.getElementById('video-vary-tex-res-fix-num-gs').load();
  document.getElementById('video-vary-tex-res-fix-num-gs').currentTime = currentTimeVaryTexResFixNumGS;
  //document.getElementById('video-name-vary-gaussians').innerHTML = videoName;
  document.getElementById('vary-tex-res-fix-num-gs-slider-value').innerHTML = "Texture Map Resolution: " + sliderValues[currentValueVaryTexResFixNumGS - 1];
}

// Texture map ablation
function selectTexAblationScene(scene) {
  document.querySelectorAll('[id^="scene-tex-ablation-button"]').forEach(button => button.classList.remove('is-active'));
  document.getElementById(`scene-tex-ablation-button-${scene}`).classList.add('is-active');
  currentTextureAblationScene = scene;
  updateTexAblationVideo();
}


function selectTexture(texture) {
  document.querySelectorAll('#texture-button-none, #texture-button-alpha, #texture-button-rgb, #texture-button-rgba').forEach(button => button.classList.remove('is-active'));
  document.getElementById(`texture-button-${texture}`).classList.add('is-active');
  currentTexture = texture;
  updateTexAblationVideo();
}


function updateTexAblationVideo() {
  let videoName = `${currentTextureAblationScene}_${currentTexture}.mp4`;
  currentTimeTextureAblation = document.getElementById('video-tex-ablation').currentTime;
  document.getElementById('video-source-tex-ablation').src = `./static/videos/tex_ablation/${videoName}`;
  document.getElementById('video-tex-ablation').load();
  document.getElementById('video-tex-ablation').currentTime = currentTimeTextureAblation;
  //document.getElementById('video-name-tex-ablation').innerHTML = videoName;
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
  document.querySelectorAll('#decomp-color-button-base, #decomp-color-button-tex').forEach(button => button.classList.remove('is-active'));
  document.getElementById(`decomp-color-button-${color}`).classList.add('is-active');
  currentColorDecomp = color;
  updateColorDecompVideo();
}


function updateColorDecompVideo() {
  let videoName = `${currentSceneDecomp}_${currentTexDecomp}_${currentColorDecomp}.mp4`;
  console.log(videoName);
  currentTimeColorDecomp = document.getElementById('video-color-decomp').currentTime;
  document.getElementById('video-source-color-decomp').src = `./static/videos/color_decomp/${videoName}`;
  document.getElementById('video-color-decomp').load();
  document.getElementById('video-color-decomp').currentTime = currentTimeColorDecomp;
  //document.getElementById('video-name-color-decomp').innerHTML = videoName;
}
