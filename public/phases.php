<?php
// Inicia a sessão para obter o progresso do usuário
session_start();

// Simula o progresso do usuário (ex.: completou até a Fase 3)
// No futuro, isso será obtido do banco de dados
$userProgress = 3;

// Define a ordem das fases conforme o layout especificado
$phaseOrder = [
    // Linha 1: 1, 2, 3, 4, 5
    1, 2, 3, 4, 5,
    // Linha 2: 10, 9, 8, 7, 6
    10, 9, 8, 7, 6,
    // Linha 3: 11, 12, 13, 14, 15
    11, 12, 13, 14, 15,
    // Linha 4: 20, 19, 18, 17, 16
    20, 19, 18, 17, 16
];
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa de Fases - Duolingo Math</title>
    <link rel="stylesheet" href="/public/css/phases.css">
</head>
<body>
    <div class="space-background">
        <h1>Mapa de Fases</h1>
        <div class="phases-container">
            <?php foreach ($phaseOrder as $index => $phaseId): ?>
                <?php
                // Determina o status da fase com base no progresso do usuário
                $status = ($phaseId <= $userProgress) ? 'completed' : (($phaseId == $userProgress + 1) ? 'current' : 'locked');
                // Define o caminho da imagem para a fase
                $imagePath = "/public/assets/phases/phase_{$phaseId}.png";
                ?>
                <div class="phase <?php echo $status; ?>" data-phase-id="<?php echo $phaseId; ?>" style="--phase-index: <?php echo $index; ?>;">
                    <img src="<?php echo htmlspecialchars($imagePath); ?>" alt="Fase <?php echo $phaseId; ?>" class="phase-image">
                    <span class="phase-number"><?php echo $phaseId; ?></span>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <script src="/public/js/phases.js"></script>
</body>
</html>