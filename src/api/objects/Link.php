<?php


namespace Objects;

require_once 'Statistics.php';


class Link {

    public string $uuid;
    public string $link;
    public string $short;

    public Statistics $statistics;

    /**
     * Link constructor.
     */
    public function __construct() {
        $this->statistics = new Statistics();
    }


    public static function fromUUID($uuid) : Link|bool {
        $linksArray = json_decode(file_get_contents(__DIR__."/../../data/data.json"), true)['links'];
        if (isset($linksArray[$uuid])) {
            $linkData = $linksArray[$uuid];
            $link = self::fromArray($linkData);
            return $link;
        }
        return false;
    }

    public static function fromArray($array) : Link {
        $link = new Link();
        $link->uuid = $array['uuid'];
        $link->link = $array['link'];
        $link->short = $array['short'];
        $link->statistics = Statistics::fromArray($array['statistics']);
        return $link;
    }

    public static function getAll() : array {
        $data = json_decode(file_get_contents(__DIR__."/../../data/data.json"), true);
        $links = $data['links'];
        $array = array();
        foreach ($links as $linkData) {
            $link = self::fromArray($linkData);
            $array[] = $link->toArray();
        }
        return $array;
    }

    public function save() {
        $data = json_decode(file_get_contents(__DIR__.'/../../data/data.json'), true);
        $data['links'][$this->uuid] = $this->toArray();
        file_put_contents(__DIR__.'/../../data/data.json', json_encode($data));
    }

    public function delete() {
        $data = json_decode(file_get_contents(__DIR__.'/../../data/data.json'), true);
        unset($data['links'][$this->uuid]);
        file_put_contents(__DIR__.'/../../data/data.json', json_encode($data));
    }

    public function toArray(): array {
        return array(
            "uuid" => $this->uuid,
            "link" => $this->link,
            "short" => $this->short,
            "statistics" => $this->statistics->toArray()
        );
    }

}