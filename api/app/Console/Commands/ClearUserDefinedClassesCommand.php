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
	protected $description = 'clear user-defined classes and json files.';

	/**
	 * Execute the console command.
	 */
	public function handle()
	{
		$directories = glob(app_path("Models/UserDefined/*"), GLOB_ONLYDIR);
		foreach ($directories as $directory) {
			array_map('unlink', glob($directory.'/*'));
			rmdir($directory);
		}
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
