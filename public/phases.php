<?php
// Inicia a sessão para obter o progresso do usuário (simulado por enquanto)
session_start();

// Simula o progresso do usuário (ex.: completou até a Fase 3)
$userProgress = 3; // Isso será obtido do banco de dados no futuro
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
            <?php for ($i = 1; $i <= 20; $i++): ?>
                <?php
                // Determina o tipo de corpo celeste
                $celestialType = ($i % 3 == 0) ? 'comet' : (($i % 2 == 0) ? 'star' : 'planet');
                // Determina o status da fase
                $status = ($i <= $userProgress) ? 'completed' : (($i == $userProgress + 1) ? 'current' : 'locked');
                ?>
                <div class="phase <?php echo $celestialType; ?> <?php echo $status; ?>" data-phase-id="<?php echo $i; ?>" style="--phase-index: <?php echo $i; ?>;">
                    <span class="phase-number"><?php echo $i; ?></span>
                </div>
            <?php endfor; ?>
        </div>
    </div>
    <script src="/public/js/phases.js"></script>
</body>
</html>