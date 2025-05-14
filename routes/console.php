<?php

use App\Actions\RunPings;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Schedule::call(new RunPings)->name('run pings')->everyTenSeconds();
