<?php

namespace App\Console;

use App\Console\Commands\FastTruncationTable;
use App\Models\ConfigModel;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        FastTruncationTable::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     *
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('patent:userId')->dailyAt('06:00');

        $schedule->call(function () {
            //清空每日记录 每天凌晨0点运行一次
            $result = ConfigModel::query()->where('keyword', 'admin_base')->first();
            $arr = (array)$result->value;
            $arr['article_total'] = 0;
            $arr['pv'] = 0;
            $arr['search'] = 0;
            $arr['submit'] = 0;
            ConfigModel::query()->where('keyword', 'admin_base')->update([
                'value' => json_encode($arr)
            ]);
        })->daily();

        //每周脚本 每周运行一次
        $schedule->call(function () {
            $result = ConfigModel::query()->where('keyword', 'admin_base')->first();
            $arr = (array)$result->value;
            $arr['monday'] = 0;
            $arr['tuesday'] = 0;
            $arr['wednesday'] = 0;
            $arr['thursday'] = 0;
            $arr['saturday'] = 0;
            $arr['sunday'] = 0;
            $arr['friday'] = 0;
            ConfigModel::query()->where('keyword', 'admin_base')->update([
                'value' => json_encode($arr)
            ]);
            //每周日23:59运行一次
        })
            ->sundays()
            ->at('23:59');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
