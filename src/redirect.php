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

$data = json_decode(file_get_contents(__DIR__ . '/data/data.json'), true);

foreach ($data['links'] as $linkData) {
    if ($linkData['short'] === $requestParts[0]) {
        $link = Link::fromArray($linkData);
        $link->statistics->addClick();
        $link->save();
        if ($link->noPreview) {
            echo '
        <script>window.location.href = "' . $link->link . '"</script>
        <noscript><meta http-equiv="refresh" content="0; url=' . $link->link . '" /></noscript>
        ';
        } else {
            header("Location: " . $link->link);
        }
        exit();
    }
}

die("Not found!");