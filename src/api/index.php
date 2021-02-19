<?php

header("content-type: application/json");

$requestParts = explode("/", $_SERVER['REQUEST_URI']);
foreach ($requestParts as $key => $requestPart) {
    if ($requestPart == "") {
        unset($requestParts[$key]);
    }
}
$requestParts = array_values($requestParts);
$handler = null;
switch ($requestParts[1]) {
    default:
        $handler = null;
        break;
}
if ($handler !== null)
    $handler->handle($requestParts);
else {
    print json_encode(array(
        "version" => "1.0.0"
    ));
}