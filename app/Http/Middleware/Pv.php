<?php

namespace App\Http\Middleware;

use Closure;

class Pv
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        TotalLogIncrementColumn('pv');
        $response = $next($request);
        return $response;
    }
}
