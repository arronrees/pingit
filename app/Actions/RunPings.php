<?php

namespace App\Actions;

use App\Jobs\ProcessPing;
use App\Models\Ping;

class RunPings
{
  public function __invoke()
  {
    $pings = Ping::where('active', true)
      ->with('latestCheck')
      ->get();

    foreach ($pings as $ping) {
      ProcessPing::dispatch($ping);
    }
  }
}
