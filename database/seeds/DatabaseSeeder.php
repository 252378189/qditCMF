<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
      $this->call(UsersTableSeeder::class);
      $this->call(MenuTableSeeder::class);
      $this->call(RoleTableSeeder::class);
      $this->call(AuthTableSeeder::class);
      $this->call(RoleAndAuthTableSeeder::class);
      $this->call(RoleAndMenuTableSeeder::class);
      $this->call(FriendLinkTableSeeder::class);
      $this->call(UserAndRoleTableSeeder::class);
      $this->call(SEOTableSeeder::class);
      $this->call(NavTableSeeder::class);
      $this->call(HtmlTemplateTableSeeder::class);
      $this->call(CategoryTableSeeder::class);
      $this->call(ConfigTableSeeder::class);
      $this->call(ArticleTableSeeder::class);
    }
}
