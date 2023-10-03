<?php


namespace Objects;


class Statistics
{

    public int $clicks;

    /**
     * Statistics constructor.
     */
    public function __construct()
    {
        $this->clicks = 0;
    }


    public static function fromArray($statisticsData): Statistics
    {
        $statistics = new Statistics();
        $statistics->clicks = $statisticsData['clicks'];
        return $statistics;
    }

    public function addClick()
    {
        $this->clicks++;
    }

    public function toArray(): array
    {
        return array(
            "clicks" => $this->clicks
        );
    }

}