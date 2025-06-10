// Função para tocar música nos destaques
function tocarMusica(src, nomeMusica, nomeArtista) {
    const audioPlayer = document.getElementById('audio-player');
    const playerElement = document.querySelector('.player');
    
    // Verifica se o player de áudio está disponível
    if (!audioPlayer) {
        console.error("O player de áudio não foi encontrado.");
        return;
    }

    // Atualiza a fonte do áudio
    audioPlayer.src = src;
    
    // Atualiza as informações no player
    document.querySelector('.nome-musica').textContent = nomeMusica;
    document.querySelector('.nome-artista').textContent = nomeArtista;
    document.querySelector('.capa-musica').src = event.target.closest('.destaque-principal').querySelector('img').src;
    
    // Toca a música
    audioPlayer.play().catch(error => {
        console.error("Erro ao tentar tocar a música:", error);
    });
    
    // Mostra o player se estiver oculto
    playerElement.classList.add('player-visivel');
    
    // Atualiza o botão de play para pausa
    const playButton = document.querySelector('.botao-play');
    playButton.innerHTML = '&#10074;&#10074;'; // Muda para o símbolo de pausa
    playButton.setAttribute('data-playing', 'true');
}