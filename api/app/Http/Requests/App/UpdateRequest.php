<?php

namespace App\Http\Requests\App;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
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
			'fields' => ['required', 'array', 'min:1'],
			'fields.*.code' => ['required', 'string', 'min:1'],
			'fields.*.valueType' => ['required', 'string', 'min:1'],
			'view' => ['required', 'array'],
			'view.code' => ['required', 'string', 'max:255'],
			'view.name' => ['required', 'string', 'max:255'],
			'view.description' => ['required', 'string', 'max:255'],
			'view.content' => ['required', 'array'],
			'view.content.*' => ['required', 'array'],
		];
    }
}