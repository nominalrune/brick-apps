<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken as Middleware;

use Illuminate\Session\TokenMismatchException;

class VerifyCsrfToken extends Middleware
{
	/**
	 * The URIs that should be excluded from CSRF verification.
	 *
	 * @var array<int, string>
	 */
	protected $except = [
		//
	];
	/**
	 * override parent's method (for cors request; e.g. from kintone)
	 */
	protected function getTokenFromRequest($request)
	{
		$token = $request->cookies->get('XSRF-TOKEN');
		return $token;
	}
	// public function handle($request, Closure $next)
    // {
    //     if (
    //         $this->isReading($request) ||
    //         $this->runningUnitTests() ||
    //         $this->inExceptArray($request) ||
    //         $this->tokensMatch($request)
    //     ) {
    //         return tap($next($request), function ($response) use ($request) {
    //             if ($this->shouldAddXsrfTokenCookie()) {
    //                 $this->addCookieToResponse($request, $response);
    //             }
    //         });
    //     }

    //     throw new TokenMismatchException('CSRF token mismatch.'. "sent token:".$this->getTokenFromRequest($request).", settion token:".$request->session()->token());
    // }
}
