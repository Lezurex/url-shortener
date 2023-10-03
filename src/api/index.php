<?php

require_once 'apiHandlers/AuthHandler.php';
require_once 'apiHandlers/LinkHandler.php';

use APIHandlers\AuthHandler;
use APIHandlers\LinkHandler;

header("content-type: application/json");

$defaultStructure = array(
    "links" => array(),
    "user" => array(
        "username" => "admin",
        "password" => '$2y$10$YRveeDBJvB5pr.1/VaK/8e9AXKvqfY5s9tiDzvbXhWxFkiVLi74cC'
    )
);

if (!file_exists("../data/data.json")) {
    file_put_contents("../data/data.json", json_encode($defaultStructure));
}

$requestParts = explode("/", $_SERVER['REQUEST_URI']);
foreach ($requestParts as $key => $requestPart) {
    if ($requestPart == "") {
        unset($requestParts[$key]);
    }
}
$requestParts = array_values($requestParts);
$handler = null;
switch ($requestParts[1]) {
    case "auth":
        $handler = new AuthHandler();
        break;
    case "links":
        $handler = new LinkHandler();
        break;
    default:
        $handler = null;
        break;
}
if ($handler !== null) {
    $handler->handle($requestParts);
} else {
    print json_encode(
        array(
            "version" => "1.0.0"
        )
    );
}