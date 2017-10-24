

function startServer() {
    $hostName = "localhost";
    $port = 8087;

    $httpListener = New-Object System.Net.HttpListener;
    $baseAddr = "http://" + $hostName + $port + "/";
    $httpListener.Prefixes.Add("http://" + $hostName + $port + "/");

    $httpListener.Start();
}

function startAction($pathParams, $queryParams) {
    echo "lolz";
}

function addAction() {

}

$actions = @{
    "/start" = startAction;
    "/add/{id}" = addAction;
    "/clients/{id}/products/{pid}/lol/{quack}" = "";
    "/troloo/{id}/products/{pid}/lol/{hej}/nocotam" = "";
}

$expressions = ("/add/{id}","/start","/clients/{id}/products/{pid}/lol/{quack}");

$paramNames = @{};
$actions.Keys | %{ $paramNames.Add($_,  $( $_ | sls -allmatches "\{[a-zA-Z]*\}" |  %{ $_.Matches} | %{ $_.Value.Substring(1,$_.Value.Length-2); }))};




