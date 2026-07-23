<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$title}}</title>

    <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>
    <script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        crossorigin></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @vite('resources/js/app.jsx')

    <style>
        .myNavbar .navbar-toggler{
            font-size:10px;
            padding:10px;
        }
        .blurBackground{
            filter: blur(8px);
        }
        .noneBlurBg{
            filter: none;
            position: absolute;
            margin-top:-400px;
        }
        .carouselSlider .carousel-control-next:hover, .carouselSlider .carousel-control-prev:hover{
            background: rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body id="app" data-page="{{$pagename}}">
</body>
</html>
