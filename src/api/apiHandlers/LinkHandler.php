<?php


namespace APIHandlers;

use Objects\Link;

require_once 'APIHandler.php';
require_once __DIR__.'/../objects/Link.php';
require_once __DIR__.'/../objects/Statistics.php';

class LinkHandler extends APIHandler {

    public function handle($parts) {
        session_start();
        if (!isset($_SESSION['loggedin'])) {
            echo json_encode(array(
                "data" => array(array(
                    "status" => "error",
                    "error" => "Session invalid"
                ))
            ));
            http_send_status(400);
            exit();
        }
        parent::handle($parts);
    }

    public function handleGet($parts, $body) {
        if (isset($parts[2])) {
            // do stuff
        } else {
            print json_encode(array(
                "data" =>  Link::getAll()
            ));
        }
    }

    public function handlePost($parts, $body) {
        $data = json_decode($body, true)['data'];
        if ($data) {
            foreach ($data as $linkData) {
                $uuid = uniqid("", true);
                $link = new Link();
                $link->short = $linkData['short'];
                $link->link = $linkData['link'];
                $link->uuid = $uuid;
                $link->save();
            }
        }
    }

    public function handlePut($parts, $body) {
        if (isset($parts[2])) {
            $link = Link::fromUUID($parts[2]);

            if ($link) {
                $data = json_decode($body, true)['data'][0];
                isset($data['link']) ? $link->link = $data['link'] : null;
                isset($data['short']) ? $link->short = $data['short'] : null;
                $link->save();
                print json_encode(array(
                    "data" => array(
                        $link->toArray()
                    )
                ));
            } else {
                print json_encode(array(
                    "data" => array(
                        array(
                            "status" => "error",
                            "error" => "Not found"
                        )
                    )
                ));
                http_send_status(400);
            }
        }
    }

    public function handleDelete($parts, $body) {
        if (isset($parts[2])) {
            $link = Link::fromUUID($parts[2]);

            if ($link) {
                $link->delete();
                print json_encode(array(
                    "data" => array(
                        array(
                            "status" => "success",
                        )
                    )
                ));
            } else {
                print json_encode(array(
                    "data" => array(
                        array(
                            "status" => "error",
                            "error" => "Not found"
                        )
                    )
                ));
                http_send_status(400);
            }
        }
    }

}