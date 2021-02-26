<?php


namespace APIHandlers;

class APIHandler {

    public function handle($parts) {
        $body = file_get_contents('php://input');
        switch ($_SERVER['REQUEST_METHOD']) {
            case "GET":
                $this->handleGet($parts, $body);
                break;
            case "POST":
                $this->handlePost($parts, $body);
                break;
            case "PUT":
                $this->handlePut($parts, $body);
                break;
            case "DELETE":
                $this->handleDelete($parts, $body);
                break;
        }
    }

    public function handleGet($parts, $body) {}
    public function handlePost($parts, $body) {}
    public function handlePut($parts, $body) {}
    public function handleDelete($parts, $body) {}

}