<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        //$this->call(DidblockSeeder::class);
		print "Assigning Bouncer Roles to Group Netowork Engineering...".PHP_EOL;
		$this->call(BouncerRoles::class);
		
		print "Importing DID List from CSV...".PHP_EOL;
		$this->call(ImportDIDListSeeder::class);
    }
}
