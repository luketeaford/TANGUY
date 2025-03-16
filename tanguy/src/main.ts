import "./style.css";
import { setupKeyboard } from "./keyboard.ts";
import { initializeAudio } from "./audio.ts";

let audioEngine = null;
document.addEventListener(
  "click",
  () => {
    audioEngine = initializeAudio();
    window.addEventListener("pitchChange", (event: CustomEvent) => {
      audioEngine.setPitch(event.detail.newPitch);
    });

    window.addEventListener("gateOn", () => {
      audioEngine.setAmplitude(1);
    });

    window.addEventListener("gateOff", () => {
      audioEngine.setAmplitude(0);
    });
  },
  { once: true }
);

const keyboardHTML = `
<div class="keyboard">
  <div class="keyboard-naturals">
    <div class="keyboard-key key-natural" id="c0"></div>
    <div class="keyboard-key key-natural" id="d0"></div>
    <div class="keyboard-key key-natural" id="e0"></div>
    <div class="keyboard-key key-natural" id="f0"></div>
    <div class="keyboard-key key-natural" id="g0"></div>
    <div class="keyboard-key key-natural" id="a0"></div>
    <div class="keyboard-key key-natural" id="b0"></div>
    <div class="keyboard-key key-natural" id="c1"></div>
    <div class="keyboard-key key-natural octave-2" id="d1"></div>
    <div class="keyboard-key key-natural octave-2" id="e1"></div>
    <div class="keyboard-key key-natural octave-2" id="f1"></div>
    <div class="keyboard-key key-natural octave-2" id="g1"></div>
    <div class="keyboard-key key-natural octave-2" id="a1"></div>
    <div class="keyboard-key key-natural octave-2" id="b1"></div>
    <div class="keyboard-key key-natural octave-2" id="c2"></div>
  </div>
  <div class="keyboard-sharps">
    <div class="keyboard-key key-sharp" id="c0-sharp"></div>
    <div class="keyboard-key key-sharp" id="d0-sharp"></div>
    <div class="keyboard-key key-sharp" id="f0-sharp"></div>
    <div class="keyboard-key key-sharp" id="g0-sharp"></div>
    <div class="keyboard-key key-sharp" id="a0-sharp"></div>
    <div class="keyboard-key key-sharp octave-2" id="c1-sharp"></div>
    <div class="keyboard-key key-sharp octave-2" id="d1-sharp"></div>
    <div class="keyboard-key key-sharp octave-2" id="f1-sharp"></div>
    <div class="keyboard-key key-sharp octave-2" id="g1-sharp"></div>
    <div class="keyboard-key key-sharp octave-2" id="a1-sharp"></div>
  </div>
</div>
`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = keyboardHTML;

setupKeyboard(document.querySelector<HTMLDivElement>(".keyboard")!);
