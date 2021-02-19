<?php

require_once 'api/objects/Link.php';

use Objects\Link;

$requestParts = explode("/", $_SERVER['REQUEST_URI']);
foreach ($requestParts as $key => $requestPart) {
    if ($requestPart == "") {
        unset($requestParts[$key]);
    }
}
$requestParts = array_values($requestParts);

$data = json_decode(file_get_contents(__DIR__.'/data/data.json'), true);

foreach ($data['links'] as $linkData) {
    $link = Link::fromArray($linkData);
    if ($link->short === $requestParts[0]) {
        $link->statistics->addClick();
        $link->save();
        header("Location: " . $link->link);
        exit();
    }
}

die("Not found!");