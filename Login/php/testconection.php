<?php
include 'config.php';  // Incluir a configuração da conexão

// Tentar realizar uma consulta simples
try {
    $stmt = $pdo->query('SELECT * FROM usuarios');
    while ($row = $stmt->fetch()) {
        echo $row['nome'] . ' - ' . $row['email'] . '<br>';
    }
} catch (PDOException $e) {
    echo 'Falha ao conectar: ' . $e->getMessage();
}
?>
