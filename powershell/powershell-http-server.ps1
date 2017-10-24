
$hostName = "localhost";
$port = 8087;

$httpListener = New-Object System.Net.HttpListener;
$baseAddr = "http://" + $hostName + $port + "/";
$httpListener.Prefixes.Add("http://" + $hostName + $port + "/");

$httpListener.Start();



