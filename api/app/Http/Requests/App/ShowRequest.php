<?php

namespace App\Http\Requests\App;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class ShowRequest extends Request
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules() : array
    {
        return [
            'code' => ['string', 'max:255'],
        ];
    }
}
