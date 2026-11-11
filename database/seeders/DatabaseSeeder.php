<?php

namespace Database\Seeders;

use App\Models\User;
\App\Models\Producto::create(['nombre' => 'Laptop Gamer', 'precio' => 1200.00]);
\App\Models\Producto::create(['nombre' => 'Mouse Inalámbrico', 'precio' => 25.50]);
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
