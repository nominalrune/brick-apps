<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ClearUserDefinedClassesCommand extends Command
{
	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'app:clear-user-defined-classes';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Command description';

	/**
	 * Execute the console command.
	 */
	public function handle()
	{
		array_map('unlink', glob(app_path("Models/UserDefined").'/*.php'));
		rmdir(app_path("Models/UserDefined"));
		mkdir(app_path("Models/UserDefined"), 0777, true);
		$this->info("successfully finished the command.");
		return 0;
	}
	private function listUserDefinedClasses()
	{
		$classes = [];
		$files = scandir(app_path("Models/UserDefined"));
		foreach ($files as $file) {
			if (strpos($file, '.php') !== false) {
				$classes[] = $file;
			}
		}
		return $classes;
	}
}
