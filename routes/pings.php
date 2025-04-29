<?php

use App\Http\Controllers\PingController;
use Illuminate\Support\Facades\Route;

Route::controller(PingController::class)->middleware('auth')->group(function () {
  Route::get('/pings',  'index')->name('pings.index');
  Route::get('/pings/create',  'create')->name('pings.create');
  Route::get('/pings/{ping}',  'show')->name('pings.show');
  Route::post('/pings',  'store')->name('pings.store');
});
