param(
)
$prevPwd = $PWD

try {
    $base = (Get-Item $PSScriptRoot).parent
    Set-Location ($base.Fullname)

    $version = npm run --silent version
    
    Remove-Item -Recurse -Force CodApiRead -ErrorAction Ignore
    Copy-Item -Recurse dist CodApiRead

    Compress-Archive -Force -LiteralPath ".\CodApiRead\" -DestinationPath "CodApiRead.zip"

    Write-Output "::set-output name=version::$version"
}
finally {
    $prevPwd | Set-Location
}