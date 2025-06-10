<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $sql = "SELECT * FROM usuarios WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if (password_verify($senha, $usuario['senha'])) {
            // ⬇⬇ ADICIONE ESTE COMENTÁRIO para que o JavaScript saiba que deu certo
            echo "sucesso|Bem-vindo, {$usuario['nome']}!";
        } else {
            echo "Credenciais não correspondem. Senha incorreta.";
        }
    } else {
        echo "Credenciais não correspondem. Usuário não encontrado.";
    }
}
?>
