<?php


namespace Objects;

require_once 'Statistics.php';


class Link {

    public string $uuid;
    public string $link;
    public string $short;

    public Statistics $statistics;

    public static function fromArray($array): Link {
        $link = new Link();
        $link->uuid = $array['uuid'];
        $link->link = $array['link'];
        $link->short = $array['short'];
        $link->statistics = Statistics::fromArray($array['statistics']);
        return $link;
    }

    public function save() {
        $data = json_decode(file_get_contents(__DIR__.'/../../data/data.json'), true);
        $data['links'][$this->uuid] = $this->toArray();
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