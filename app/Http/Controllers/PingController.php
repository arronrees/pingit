<?php

namespace App\Http\Controllers;

use App\Models\Ping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PingController extends Controller
{
    public function index()
    {
        $pings = Ping::where('user_id', Auth::user()->id)->paginate(15);

        return Inertia::render('pings/index', ['data' => $pings]);
    }

    public function show(Ping $ping)
    {
        $ping->load(['checks' => fn($query) => $query->orderBy('time_checked', 'desc')->take(10)]);

        return Inertia::render('pings/show', ['ping' => $ping]);
    }

    public function create()
    {
        return Inertia::render('pings/create');
    }

    public function store(Request $request)
    {
        $validIntervals = [3600, 7200, 10800, 21600, 43200, 86400];

        $validated = $request->validate([
            'url' => ['required', 'url'],
            'interval' => ['required', Rule::in($validIntervals)],
            'active' => ['required', 'boolean'],
        ]);

        $ping = Ping::create([...$validated, 'user_id' => Auth::user()->id]);

        return redirect()->route('pings.index')->with('success', 'Ping created successfully.');
    }

    public function edit(Ping $ping)
    {
        return Inertia::render('pings/edit', ['ping' => $ping]);
    }

    public function update(Ping $ping, Request $request)
    {
        $validIntervals = [3600, 7200, 10800, 21600, 43200, 86400];

        $validated = $request->validate([
            'url' => ['required', 'url'],
            'interval' => ['required', Rule::in($validIntervals)],
            'active' => ['required', 'boolean'],
        ]);

        $ping->update($validated);

        return redirect()->route('pings.show', $ping->id)->with('success', 'Ping updated successfully.');
    }

    public function destroy(Ping $ping, Request $request)
    {
        $request->validate(['deletionText' => ['required', Rule::in(['DELETE'])]]);

        $ping->delete();

        return redirect()->route('pings.index')->with('success', 'Ping deleted successfully.');
    }
}
