<?php

$tests = [

                    [
                        // Create: Good Data
                        'title'              => 'Title: Create Valid DID Block',
                        'input'              => ['country_code' => 1, 'name' => 'TEST GOOD DID BLOCK', 'carrier' => 'TEST GOOD CARRIER', 'start' => 1004560000, 'end' => 1004560009],
                        'verb'               => 'POST',
                        'url'                => '/api/didblock',
                        'expected_field'     => 'status_code',
                        'expected_result'    => '200',
                    ],
                    [
                        // Create: No Name
                        'title'              => 'Title: DID Block with No Name - Should Fail',
                        'input'              => ['country_code' => 1, 'carrier' => 'TEST', 'start' => 1004560010, 'end' => 1004560019],
                        'verb'               => 'POST',
                        'url'                => '/api/didblock/',
                        'expected_field'     => 'status_code',
                        'expected_result'    => '500',
                    ],
                    [
                        // Create: No Carrier - this is optional and should pass
                        'title'              => 'Title: Create: DID Block with No Carrier - this is optional and should pass ',
                        'input'              => ['country_code' => 1, 'name' => 'TEST GOOD DID BLOCK', 'carrier' => '', 'start' => 1004560020, 'end' => 1004560029],
                        'verb'               => 'POST',
                        'url'                => '/api/didblock/',
                        'expected_field'     => 'status_code',
                        'expected_result'    => '200',
                    ],
                    [
                        // Create: Bad Data
                        'title'              => 'Title: Create DID Block with 11 Digits',
                        'input'              => ['country_code' => '1', 'name' => 'TEST DID BLOCK', 'carrier' => 'TEST CARRIER', 'start' => 10045600300, 'end' => 10045600390],
                        'verb'               => 'POST',
                        'url'                => '/api/didblock',
                        'expected_field'     => 'status_code',
                        'expected_result'    => '500',
                    ],
                    [
                        // Create: Bad Data
                        'title'              => 'Title: Create DID block with a non numeric country code',
                        'input'              => ['country_code' => '+1', 'name' => 'TEST DID BLOCK', 'carrier' => 'TEST CARRIER', 'start' => 1004560040, 'end' => 1004560049],
                        'verb'               => 'POST',
                        'url'                => '/api/didblock',
                        'expected_field'     => 'status_code',
                        'expected_result'    => '500',
                    ],
                    [
                        //
                        'title'              => 'Title: Create DID Block with 11 Digits',
                        'input'              => ['country_code' => '1', 'name' => 'TEST DID BLOCK', 'carrier' => 'TEST CARRIER', 'start' => 1004560050, 'end' => 1004560059],
                        'verb'               => 'POST',
                        'url'                => '/api/didblock',
                        'expected_field'     => 'status_code',
                        'expected_result'    => '500',
                    ],
                ];

        file_put_contents(__DIR__.'tests/test.json', json_encode($tests));