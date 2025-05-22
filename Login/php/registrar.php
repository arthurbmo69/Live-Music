<?php
// Exibe todos os erros (útil durante testes)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Verifica se os dados foram enviados via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Captura e sanitiza os dados do formulário
    $nome  = trim($_POST['nome'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $senha = trim($_POST['senha'] ?? '');

    // Verifica se todos os campos estão preenchidos
    if ($nome && $email && $senha) {
        
        // Criptografa a senha com password_hash()
        $senhaSegura = password_hash($senha, PASSWORD_DEFAULT);

        // Monta os dados para enviar ao Firebase
        $dados = [
            'nome'  => $nome,
            'email' => $email,
            'senha' => $senhaSegura
        ];

        // Converte os dados para JSON
        $json = json_encode($dados);

        // URL do seu Firebase Realtime Database
        $url = 'https://banco-live-music-default-rtdb.firebaseio.com/usuarios.json';

        // Define as opções da requisição HTTP
        $opcoes = [
            'http' => [
                'header'  => "Content-type: application/json\r\n",
                'method'  => 'POST',
                'content' => $json
            ]
        ];

        // Cria o contexto da requisição
        $contexto = stream_context_create($opcoes);

        // Envia os dados para o Firebase
        $resposta = file_get_contents($url, false, $contexto);

        // Verifica a resposta
        if ($resposta !== false) {
            echo "<script>alert('Usuário registrado com sucesso!'); window.location.href='index.html';</script>";
        } else {
            echo "<script>alert('Erro ao registrar!'); history.back();</script>";
        }

    } else {
        echo "<script>alert('Preencha todos os campos!'); history.back();</script>";
    }

} else {
    echo "Acesso inválido.";
}
?>
