export function setupKeyboard(element: HTMLDivElement) {
  element.addEventListener("pointerdown", (anEvent) => {
    const pitchesByID = {
      c0: 261.63,
      d0: 293.66,
      e0: 329.63,
      f0: 349.23,
      g0: 392.0,
      a0: 440.0,
      b0: 493.88,
      c1: 523.25,
      d1: 587.33,
      e1: 659.26,
      f1: 698.46,
      g1: 783.99,
      a1: 880.0,
      b1: 987.77,
      c2: 1046.5,
      "c0-sharp": 277.18,
      "d0-sharp": 311.13,
      "f0-sharp": 369.99,
      "g0-sharp": 415.3,
      "a0-sharp": 466.16,
      "c1-sharp": 554.37,
      "d1-sharp": 622.25,
      "f1-sharp": 739.99,
      "g1-sharp": 830.61,
      "a1-sharp": 932.33,
    };
    const pitchChangeEvent = new CustomEvent("pitchChange", {
      detail: {
        newPitch: pitchesByID[anEvent.target.id],
      },
    });
    window.dispatchEvent(pitchChangeEvent);
  });

  element.addEventListener("pointerdown", (anEvent) => {
    anEvent.preventDefault();
    window.dispatchEvent(new CustomEvent("gateOn"));
  });

  element.addEventListener("pointermove", (anEvent) => {
    anEvent.preventDefault();
  });

  element.addEventListener("pointerup", (anEvent) => {
    window.dispatchEvent(new CustomEvent("gateOff"));
  });
}
