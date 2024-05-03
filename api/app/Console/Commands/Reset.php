<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\App;

class Reset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'freshly migrate and seed the db.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // check if this is local env or demo env
        $env = App::environment();
        if (! in_array($env, ["local", "demo"])) {
            // message its not proper env
            $this->info("This command can only be run in local or demo environment.");
            $this->info("exiting...");
            return;
        }
        // ask if you sure
        if ($this->confirm("Are you sure to reset? (env: $env)", false) === false) {
            $this->info("exiting...");
        }

        $this->call('migrate:fresh');
        $seeder = "DemoSeeder";
        $this->call('db:seed', [
            "--class" => $seeder,
        ]);
        $this->info("successfully finished the command.");
    }
}
