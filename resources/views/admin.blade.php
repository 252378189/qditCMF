<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/base.css">
    <title>驱动IT网站快速扩展模板</title>
    <style>
        body{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        html, body {
            height: 100%;
        }
        #app{
            height: 100%;
        }
    </style>
</head>
<body>
<div id="app">
    <router-view/>
</div>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>