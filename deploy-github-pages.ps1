# Script de déploiement GitHub Pages automatique
# Usage: .\deploy-github-pages.ps1

Write-Host "🚀 Déploiement sur GitHub Pages..." -ForegroundColor Cyan

# Aller dans le dossier principal
Set-Location "C:\Users\Jaeme\Desktop\leadgen-site"

# Sauvegarder la branche actuelle
$currentBranch = git rev-parse --abbrev-ref HEAD

# Aller sur gh-pages
git checkout gh-pages

# Copier les fichiers de flo-landing
Write-Host "📁 Copie des fichiers..." -ForegroundColor Yellow
Remove-Item * -Recurse -Force -Exclude .git
Copy-Item -Path "C:\Users\Jaeme\Desktop\leadgen-site-temp\flo-landing\*" -Destination . -Recurse

# Commit et push
git add .
git commit -m "Update site - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin gh-pages

# Retour sur la branche précédente
git checkout $currentBranch

Write-Host "✅ Déploiement terminé sur GitHub Pages !" -ForegroundColor Green
Write-Host "🌐 Site disponible sur: https://jaemeson-ra.github.io/leadgen-site/" -ForegroundColor Cyan
