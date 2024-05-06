<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Profile;

class UserStoreRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize() : bool
	{
		return false;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
	 */
	public function rules() : array
	{
		return [
			'email' => ['required', 'email', 'unique:users'],
			'password' => ['required', 'min:8'],
			'profile' => ['optional', 'array'],
			'profile.name' => ['required', 'string'],
			'profile.description' => ['required', 'string'],
			'group' => ['optional', 'array'],
		];
	}

	public function passedValidation()
	{
		$this->merge([
			'password' => bcrypt($this->password),
		]);
		if($this->has('profile')) {
			$this->merge([
				'profile' => Profile::create($this->profile),
			]);
		}
	}
}
