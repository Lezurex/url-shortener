<?php


namespace APIHandlers;

require_once 'APIHandler.php';

use APIHandlers\APIHandler;

class AuthHandler extends APIHandler
{

    public function handleGet($parts, $body)
    {
        if ($parts[2] === "status") {
            session_start();
            if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
                echo json_encode(
                    array(
                        "data" => array(
                            array(
                                "loggedin" => true
                            )
                        )
                    )
                );
                return;
            }
            echo json_encode(
                array(
                    "data" => array(
                        array(
                            "loggedin" => false
                        )
                    )
                )
            );
        } elseif ($parts[2] === "info") {
            session_start();
            if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
                $data = json_decode(file_get_contents(__DIR__ . "/../../data/data.json"), true);
                $username = $data['user']['username'];
                echo json_encode(
                    array(
                        "data" => array(
                            array(
                                "username" => $username
                            )
                        )
                    )
                );
                return;
            }
            echo json_encode(
                array(
                    "data" => array(
                        array(
                            "status" => "error",
                            "error" => "Session invalid"
                        )
                    )
                )
            );
            http_send_status(401);
        }

    }

    public function handlePost($parts, $body)
    {
        if ($parts[2] === "login") {
            $data = json_decode($body, true)['data'][0];
            if ($data) {
                $file = file_get_contents(__DIR__ . "/../../data/data.json");
                $credentials = json_decode($file, true)['user'];
                if (
                    $data['username'] === $credentials['username'] &&
                    password_verify($data['password'], $credentials['password'])
                ) {
                    session_start();
                    $_SESSION['loggedin'] = true;
                    echo json_encode(
                        array(
                            "data" => array(
                                array(
                                    "status" => "success"
                                )
                            )
                        )
                    );
                    return;
                }
                echo json_encode(
                    array(
                        "data" => array(
                            array(
                                "status" => "error",
                                "error" => "Wrong credentials"
                            )
                        )
                    )
                );
                return;
            }
            echo json_encode(
                array(
                    "data" => array(
                        array(
                            "status" => "error",
                            "error" => "Malformed request"
                        )
                    )
                )
            );
        } elseif ($parts[2] === "logout") {
            session_start();
            session_destroy();

            echo json_encode(
                array(
                    "data" => array(
                        array(
                            "status" => "success"
                        )
                    )
                )
            );
        }
    }

    public function handlePut($parts, $body)
    {
        if ($parts[2] === "credentials") {
            session_start();
            if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
                $data = json_decode(file_get_contents(__DIR__ . "/../../data/data.json"), true);
                $userdata = $data['user'];
                $request = json_decode($body, true)['data'][0];
                if (isset($request['username'])) {
                    $userdata['username'] = $request['username'];
                }
                if (isset($request['password']) && $request['password'] !== '') {
                    $userdata['password'] = password_hash($request['password'], PASSWORD_DEFAULT);
                }
                $data['user'] = $userdata;

                file_put_contents(__DIR__ . "/../../data/data.json", json_encode($data));

                echo json_encode(
                    array(
                        "data" => array(
                            array(
                                "status" => "success"
                            )
                        )
                    )
                );
                return;
            }
            echo json_encode(
                array(
                    "data" => array(
                        array(
                            "status" => "error",
                            "error" => "Session invalid"
                        )
                    )
                )
            );
            http_send_status(401);
        }
    }

    public function handleDelete($parts, $body)
    {
        parent::handleDelete($parts, $body); // TODO: Change the autogenerated stub
    }

}