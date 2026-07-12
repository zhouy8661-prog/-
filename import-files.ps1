# Import script - copy files from ../待导入 to project directories by naming convention
# Usage: Run this script from portfolio/ directory
param(
    [string]$Source = "",
    [string]$Target = ""
)

if (-not $Source) {
    $Source = Join-Path $PSScriptRoot '..\..\待导入'
}
if (-not $Target) {
    $Target = Join-Path $PSScriptRoot 'public\projects'
}

$projectMap = @{
    'guiyuan'        = 'guiyuan'
    'guiyuan-minnan' = 'guiyuan-minnan'
    'gamejam'        = 'gamejam'
}

$imported = 0
$skipped  = 0

$files = Get-ChildItem -Path $Source -File | Where-Object { $_.Name -notlike '*.md' }

foreach ($file in $files) {
    $name = $file.Name
    $ext  = $file.Extension

    if ($name -match '~$' -or $name -match '\.DS_Store') { continue }

    $matchedProject = $null
    foreach ($key in $projectMap.Keys) {
        if ($name -match ('^' + $key + '-')) {
            $matchedProject = $key
            break
        }
    }
    if (-not $matchedProject) {
        Write-Host ('[SKIP] ' + $name) -ForegroundColor Yellow
        $skipped++
        continue
    }

    $projDir   = $projectMap[$matchedProject]
    $remainder = $name.Substring($matchedProject.Length + 1)

    # cover
    if ($remainder -match '^cover\.') {
        $dest = Join-Path $Target "$projDir\cover$ext"
        Copy-Item $file.FullName -Destination $dest -Force
        Write-Host ('[OK] cover -> ' + $projDir + '/cover' + $ext) -ForegroundColor Green
        $imported++
        continue
    }

    # trailer
    if ($remainder -match '^trailer\.') {
        $dest = Join-Path $Target "$projDir\trailer$ext"
        Copy-Item $file.FullName -Destination $dest -Force
        Write-Host ('[OK] trailer -> ' + $projDir + '/trailer' + $ext) -ForegroundColor Green
        $imported++
        continue
    }

    # demo
    if ($remainder -match '^demo\.') {
        $dest = Join-Path $Target "$projDir\demo$ext"
        Copy-Item $file.FullName -Destination $dest -Force
        Write-Host ('[OK] demo -> ' + $projDir + '/demo' + $ext) -ForegroundColor Green
        $imported++
        continue
    }

    # pdf
    if ($remainder -match '^project\.pdf$' -or $remainder -match '^pdf\.pdf$') {
        $dest = Join-Path $Target "$projDir\project.pdf"
        Copy-Item $file.FullName -Destination $dest -Force
        Write-Host ('[OK] PDF -> ' + $projDir + '/project.pdf') -ForegroundColor Green
        $imported++
        continue
    }

    # feature clips (f-xxx)
    if ($remainder -match '^f-([\w\-]+)\.(.+)$') {
        $feature = $Matches[1]
        $ext2    = '.' + $Matches[2]
        $featureDir = Join-Path $Target "$projDir\features"
        New-Item -ItemType Directory -Path $featureDir -Force | Out-Null
        $dest = Join-Path $Target "$projDir\features\$feature$ext2"
        Copy-Item $file.FullName -Destination $dest -Force
        Write-Host ('[OK] feat -> ' + $projDir + '/features/' + $feature + $ext2) -ForegroundColor Green
        $imported++
        continue
    }

    # gallery (g-category-NN)
    if ($remainder -match '^g-([a-z]+)-(\d+)\.(.+)$') {
        $category = $Matches[1]
        $number   = $Matches[2]
        $ext2     = '.' + $Matches[3]
        $galleryDir = Join-Path $Target "$projDir\gallery"
        New-Item -ItemType Directory -Path $galleryDir -Force | Out-Null
        $dest = Join-Path $Target "$projDir\gallery\$category-$number$ext2"
        Copy-Item $file.FullName -Destination $dest -Force
        Write-Host ('[OK] gallery -> ' + $projDir + '/gallery/' + $category + '-' + $number + $ext2) -ForegroundColor Green
        $imported++
        continue
    }

    # old gallery format (g-NN)
    if ($remainder -match '^g-(\d+)\.(.+)$') {
        $number = $Matches[1]
        $ext2   = '.' + $Matches[2]
        $galleryDir = Join-Path $Target "$projDir\gallery"
        New-Item -ItemType Directory -Path $galleryDir -Force | Out-Null
        $dest = Join-Path $Target "$projDir\gallery\screenshot-$number$ext2"
        Copy-Item $file.FullName -Destination $dest -Force
        Write-Host ('[OK] gallery(legacy) -> ' + $projDir + '/gallery/screenshot-' + $number + $ext2) -ForegroundColor Green
        $imported++
        continue
    }

    # unknown format
    Write-Host ('[SKIP] unknown: ' + $name) -ForegroundColor Yellow
    $skipped++
}

Write-Host ''
Write-Host ('=== Done: imported ' + $imported + ', skipped ' + $skipped + ' ===') -ForegroundColor Cyan

# gallery summary
Write-Host ''
Write-Host '--- Gallery summary (for projects.ts) ---' -ForegroundColor Magenta
foreach ($projKey in $projectMap.Keys) {
    $dir = Join-Path $Target "$($projectMap[$projKey])\gallery"
    if (Test-Path $dir) {
        $galleryFiles = Get-ChildItem -Path $dir -File | Sort-Object Name
        if ($galleryFiles.Count -gt 0) {
            Write-Host ('  [' + $projKey + ']') -ForegroundColor White
            foreach ($gf in $galleryFiles) {
                $cat = $gf.BaseName -replace '-\d+$', ''
                Write-Host ('    ' + $cat + ' -> /projects/' + $projectMap[$projKey] + '/gallery/' + $gf.Name) -ForegroundColor Gray
            }
        }
    }
}
