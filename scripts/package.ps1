param(
)
$prevPwd = $PWD

try {
    $base = (Get-Item $PSScriptRoot).parent
    Set-Location ($base.Fullname)

    $version = npm run --silent version 2> $null
    
    Remove-Item -Recurse -Force CodApiRead -ErrorAction Ignore > $null
    Copy-Item -Recurse dist CodApiRead > $null

    Compress-Archive -Force -LiteralPath ".\CodApiRead\" -DestinationPath "CodApiRead.zip" > $null

    Write-Output "::set-output name=version::$version"
}
finally {
    $prevPwd | Set-Location
}