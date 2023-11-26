<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AppUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules() : array
    {
        return [
            'code' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['required', 'string', 'max:255'],
            'form' => ['required', 'array', 'min:1'],
            'form.*' => ['required', 'array', 'min:1'],
            'form.*.*' => ['required','array'],
            'form.*.*.code' => ['string'],
            'form_keys' => ['required', 'array'],
        ];
    }
}
