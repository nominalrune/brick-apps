<?php

namespace App\Models;

class Permission
{
	public const READ = 1;
	public const CREATE = 2;
	public const UPDATE = 4;
	public const ARCHIVE = 8;
	public const DELETE = 16;
}
