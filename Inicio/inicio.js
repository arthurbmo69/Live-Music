// Função para tocar música nos destaques
function tocarMusica(src, nomeMusica, nomeArtista) {
    const audioPlayer = document.getElementById('audio-player');
    const playerElement = document.querySelector('.player');
    
    // Atualiza a fonte do áudio
    audioPlayer.src = src;
    
    // Atualiza as informações no player
    document.querySelector('.nome-musica').textContent = nomeMusica;
    document.querySelector('.nome-artista').textContent = nomeArtista;
    document.querySelector('.capa-musica').src = event.target.closest('.destaque-principal').querySelector('img').src;
    
    // Toca a música
    audioPlayer.play();
    
    // Mostra o player se estiver oculto
    playerElement.classList.add('player-visivel');
    
    // Atualiza o botão de play para pausa
    const playButton = document.querySelector('.botao-play');
    playButton.innerHTML = '&#10074;&#10074;';
    playButton.setAttribute('data-playing', 'true');
}
