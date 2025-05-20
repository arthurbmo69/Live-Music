document.addEventListener('DOMContentLoaded', () => {
  const volumeSlider = document.querySelector('.barra-volume');
  const waves = document.querySelectorAll('.volume-waves .wave');
  const botaoPlay = document.querySelector('.botao-play');
  const barraProgresso = document.querySelector('.barra-progresso');
  const progresso = document.querySelector('.progresso');
  const audio = document.getElementById('audio-player');
  const tempoInicio = document.querySelector('.tempo-inicio');
  const tempoFim = document.querySelector('.tempo-fim');

  // ---- Volume com ondas ----
  function atualizarCorVolume(valor) {
    const porcentagem = `${valor}%`;
    volumeSlider.style.background = `linear-gradient(to right, #fff ${porcentagem}, #535353 ${porcentagem})`;

    const alturaMaxima = 14;
    const alturaMinima = 4;
    const altura = alturaMinima + ((alturaMaxima - alturaMinima) * (valor / 100));

    waves.forEach((wave, index) => {
      const incremento = index * 2;
      wave.style.height = `${altura + incremento}px`;
      wave.style.opacity = valor > 0 ? '1' : '0.2';
    });
  }

  if (volumeSlider) {
    atualizarCorVolume(volumeSlider.value);

    volumeSlider.addEventListener('input', function () {
      atualizarCorVolume(this.value);
      if (audio) {
        audio.volume = this.value / 100;
      }
    });
  }

  // ---- Botão Play/Pause com troca de ícone ▶ ⏸ ----
  if (botaoPlay && audio) {
    botaoPlay.addEventListener('click', () => {
      const isPlayIcon = botaoPlay.textContent.trim() === '▶';

      if (isPlayIcon) {
        audio.play();
        botaoPlay.textContent = '⏸';
      } else {
        audio.pause();
        botaoPlay.textContent = '▶';
      }
    });
  }

  // ---- Atualiza tempo total e tempo atual ----
  if (audio && progresso && tempoInicio && tempoFim) {
    audio.addEventListener('loadedmetadata', () => {
      // Mostra tempo total da música
      tempoFim.textContent = formatarTempo(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progresso.style.width = `${percent}%`;
      tempoInicio.textContent = formatarTempo(audio.currentTime);
    });
  }

  // ---- Clique e arraste na barra de progresso ----
  if (barraProgresso && progresso && audio) {
    barraProgresso.addEventListener('click', (e) => {
      const larguraBarra = barraProgresso.clientWidth;
      const cliqueX = e.offsetX;
      const percent = cliqueX / larguraBarra;
      progresso.style.width = `${percent * 100}%`;
      audio.currentTime = percent * audio.duration;
    });

    let arrastando = false;

    barraProgresso.addEventListener('mousedown', (e) => {
      arrastando = true;
      atualizarProgresso(e);
    });

    document.addEventListener('mousemove', (e) => {
      if (arrastando) {
        atualizarProgresso(e);
      }
    });

    document.addEventListener('mouseup', () => {
      arrastando = false;
    });

    function atualizarProgresso(e) {
      const rect = barraProgresso.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const largura = barraProgresso.clientWidth;
      const percent = Math.max(0, Math.min(1, offsetX / largura));
      progresso.style.width = `${percent * 100}%`;
      audio.currentTime = percent * audio.duration;
    }
  }

  // ---- Formata segundos para mm:ss ----
  function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' + seg : seg}`;
  }

  // ---- Favoritar músicas ----
  document.querySelectorAll('.btn-favorito').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.classList.toggle('favorito');
      btn.textContent = btn.classList.contains('favorito') ? '❤️' : '♡';
    });
  });
});
