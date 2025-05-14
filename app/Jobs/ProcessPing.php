<?php

namespace App\Jobs;

use App\Models\Ping;
use App\Models\PingCheck;
use Carbon\Carbon;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;

class ProcessPing implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Ping $ping)
    {
        //
    }

    private function checkPing(Carbon $now)
    {
        try {

            $response = Http::head($this->ping->url);

            PingCheck::create(['ping_id' => $this->ping->id, 'status' => $response->status(), 'time_checked' => $now]);
        } catch (RequestException $e) {
        }
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $now = Carbon::now();

        if (!$this->ping->latestCheck) {

            $this->checkPing($now);

            return;
        }

        $timeDifference = Carbon::parse($this->ping->latestCheck->time_checked)->diffInSeconds($now);

        if (ceil($timeDifference) >= $this->ping->interval) {

            $this->checkPing($now);

            return;
        }
    }
}
