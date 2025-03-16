export function initializeAudio() {
  const ac = new AudioContext();
  const finalGain = ac.createGain();
  finalGain.connect(ac.destination);
  finalGain.gain.value = 0;
  const osc1 = ac.createOscillator();
  osc1.type = "triangle";
  osc1.frequency.value = 110;
  osc1.start();
  const osc1FrequencyVCA = ac.createGain();
  osc1FrequencyVCA.gain.value = -1;
  osc1FrequencyVCA.connect(osc1.frequency);

  const osc1Amp = ac.createGain();
  osc1Amp.gain.value = 1;
  osc1.connect(osc1Amp);
  osc1Amp.connect(finalGain);
  const osc2 = ac.createOscillator();
  osc2.type = "square";
  osc2.frequency.value = 442;
  osc2.start();
  const preset = {
    vcaEnvelopeAttack: 0.0001,
    vcaEnvelopeDecay: 0.1001,
  };
  const setRouting = ({ osc1Connections, osc2Connections }) => {
    osc1Connections.forEach((connection) => {
      osc1.connect(connection);
    });

    osc2Connections.forEach((connection) => {
      osc2.connect(connection);
    });
  };

  setRouting({
    osc1Connections: [osc1Amp],
    osc2Connections: [osc1Amp.gain],
  });

  return {
    preset,
    setAmplitude: (anAmplitude: number) => {
      finalGain.gain.cancelScheduledValues(0);

      finalGain.gain.setTargetAtTime(
        anAmplitude,
        ac.currentTime,
        anAmplitude > 0 ? preset.vcaEnvelopeAttack : preset.vcaEnvelopeDecay
      );
    },
    setPitch: (aPitch: number) => {
      osc1.frequency.value = aPitch;
      osc2.frequency.value = aPitch / 8;
    },
    setRouting,
  };
}
