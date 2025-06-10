<?php
$host = '127.0.0.1';  // Endereço do servidor MySQL (localhost)
$db = 'login_system'; // Nome do banco de dados
$user = 'root';       // Usuário do banco de dados
$pass = 'root';           // Senha (deixe em branco se não houver)

try {
    // Conexão com o banco de dados usando PDO
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  // Configuração para erros
} catch (PDOException $e) {
    echo 'Erro ao conectar ao banco: ' . $e->getMessage();
}
?>
