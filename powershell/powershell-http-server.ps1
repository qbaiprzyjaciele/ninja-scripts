

function startServer($actions, $paramNames, $pathPatterns) {
    $hostName = "localhost";
    $port = 8087;

    $httpListener = New-Object System.Net.HttpListener;
    $baseAddr = "http://" + $hostName + ":" + $port + "/";
    $httpListener.Prefixes.Add($baseAddr);
    $httpListener.Start();
    While($httpListener.IsListening) {
        $ctx = $httpListener.GetContext();
        $req = $ctx.Request;
        $path = $req.Url.LocalPath;
        echo "$path requested...;
        $actions.Keys | 
        
    }

}

function startAction($pathParams, $queryParams) {
    echo "start action...";
}

function addAction() {

}


$actions = @{
    "/start" = startAction;
    "/add/{id}" = addAction;
    "/clients/{id}/products/{pid}/events/{eventId}" = "";
    "/litwo/{ojczyzno}/moja/{ty}/jestes/{jak}/zdrowie" = "";
}

$paramNames = @{};
$actions.Keys | %{ $paramNames.Add($_,  $( $_ | sls -allmatches "\{[a-zA-Z]*\}" |  %{ $_.Matches} | %{ $_.Value.Substring(1,$_.Value.Length-2); }))};
$pathPatterns = @{};
$actions.Keys  | %{ $pathPatterns.Add($_, $_ -replace "\{[a-zA-Z]*\}", "\{[a-zA-Z]*\}"  -replace "/","\/" };


