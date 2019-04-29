<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FastTruncationTable extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fast:truncate {--drop}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '执行数据填充出错,运行此命令后可重新执行数据迁移';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $drop = $this->option('drop');

        $this->info('开始执行!');

        $existsTable = [ //存在的表
            'articles',
            'authorities',
            'categories',
            'config',
            'friend_links',
            'html_templates',
            'menus',
            'navs',
            'role_and_auth',
            'role_and_menus',
            'roles',
            's_e_o_s',
            'user_and_role',
            'users',
            'migrations',
            'password_resets',
        ];

        if ($drop) {
            $this->drop($existsTable);
        } else {
            $this->truncate($existsTable);
        }
        $this->info('执行完毕!');

    }

    /**
     * 截断表
     *
     * @param array $existsTable
     */
    public function truncate(array $existsTable)
    {
        foreach ($existsTable as $item) {
            $this->warn($item . ':表已截断');
            DB::statement("truncate table {$item}");
        }
    }

    /**
     * 删除表
     *
     * @param $existsTable
     */
    public function drop($existsTable)
    {
        foreach ($existsTable as $item) {
            $this->warn($item . ':表已删除');
            Schema::dropIfExists($item);
        }
    }
}
