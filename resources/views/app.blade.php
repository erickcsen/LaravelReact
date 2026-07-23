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

    @vite('resources/js/app.jsx')

    <style>
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
