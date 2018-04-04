var width, height, canvas;

var imageSource = "Sprite.png";
var COLORSOURCE = "flower.png";

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    var data;
    var pixels;
    var numPixels;
    var add = 1;
    var add2 = 1;
    //c.fillStyle = "purple";
    //c.fillRect(0, 0, width, height);
    //c.fillStyle = "white";

    var emage = new Image();

    emage.addEventListener('load', function () {
        //c.drawImage(emage, 0, 300);
    }, false);
    emage.src = "SPRITE_SHEET_BW.png";

    var img = new Image(); // Create new img element
    img.addEventListener('load', function () {

        c.drawImage(img, 0, 0);
        //c.scale(3, 3);



        data = c.getImageData(0, 0, img.width, img.height);
        pixels = data.data;
        numPixels = pixels.length;

        console.log(img.height);


        for (var i = 0; i < pixels.length; i += 4) {
            var avg = pixels[i] + pixels[i + 1] + pixels[i + 2] / 3;
            pixels[i] = 255 - pixels[i];
            pixels[i + 1] = 255 - pixels[i + 1];
            pixels[i + 2] = 255 - pixels[i + 2];
        }



        draw(data);
    }, false);
    img.src = 'flower.jpg'; // Set source path


    var draw = function () {
        //c.clearRect(0, 0, width, height);
        //c.drawImage(emage, 0, 100);



        /*
        for (var r = 0; r < 1; r++) {
            var r1 = pixels[0];
            var g1 = pixels[1];
            var b1 = pixels[2];
            var a1 = pixels[3];

            for (var i = 0; i < pixels.length; i += 4) {
                //index = (x * img.width + y) * 4;
                pixels[i] = pixels[i + 4];
                pixels[i + 1] = pixels[i + 5];
                pixels[i + 2] = pixels[i + 6];
                pixels[i + 3] = pixels[i + 7];
            }

            /*for (x = 0; x < img.width; x++) {
                for (var y = 0; y < img.height; y++) {

                    pixels[index + 0] = pixels[index + 4];
                    pixels[index + 1] = pixels[index + 5];
                    pixels[index + 2] = pixels[index + 6];
                    pixels[index + 3] = pixels[index + 7];
                }
            }
            
            */
        /*
            pixels[pixels.length - 4] = r1;
            pixels[pixels.length - 3] = g1;
            pixels[pixels.length - 2] = b1;
            pixels[pixels.length - 1] = a1;

        }
        */








        /*for (var i = 0; i < numPixels; i += 4) {
            var index = i /
        }
        for (var j = 0; j < 1; j++) {
            for (var i = 0; i < img.height; i++) {
                nextPix.push(pixels[i * j]);
                nextPix.push(pixels[i * j] + 1);
                nextPix.push(pixels[i * j] + 2);
                nextPix.push(pixels[i * j] + 3);
            }
        }

        pixels = [];
        pixels = nextPix;*/


        /*for (var j = 0; j < img.height; j++) {
            for (var i = 0; i < img.width; i++) {
                var r1 = pixels[i * j];
                var g1 = pixels[i * j + 1];
                var b1 = pixels[i * j + 2];

                var r2 = pixels[i * (j + 1)];
                var g2 = pixels[i * (j + 1) + 1];
                var b2 = pixels[i * (j + 1) + 2];

                pixels[i * j]
                pixels[i * j + 1]
                pixels[i * j + 2]

                pixels[i * (j + 1)]
                pixels[i * (j + 1) + 1]
                pixels[i * (j + 1) + 2]
            }
        }*/
        /*


        for (var i = 0; i < numPixels; i++) {
            //pixels[i * 4] = 255 - pixels[i * 4]; // Red
            //pixels[i * 4 + 1] = 255 - pixels[i * 4 + 1]; // Green
            //pixels[i * 4 + 2] = 255 - pixels[i * 4 + 2]; // Blue

            var eS = 100;

            var red = pixels[i * 4];
            var green = pixels[i * 4 + 1];
            var blue = pixels[i * 4 + 2];

            if (red >= 255) {
                add = -1;
            }

            if (green >= 255) {
                add2 = -2;
            }

            if (red <= 0) {
                add = 1;
            }

            if (green <= 0) {
                add2 = 2;
            }

            red += add;
            green += add2;
            pixels[i * 4] = red;
            pixels[i * 4 + 1] = green;
            //if (red != 0 && green != 0 && blue != 0) {
            //if (red < 255 + eS && green < 255 + eS && blue < 255 + eS) {
            //pixels[i * 4] = red + 120;
            //pixels[i * 4 + 1] = 0;
            //pixels[i * 4 + 2] = 0;
            //}
            //}
        }
        */

        c.putImageData(data, 0, 183);
        window.requestAnimationFrame(draw);
    }


    /*
        
    var colorImage = new Image();
    colorImage.src = COLORSOURCE;
    var colorImageWidth = colorImage.width;
    var colorImageHeight = colorImage.height;
    var colorImageData = c.getImageData(0, 0, colorImageWidth, colorImageHeight);

    console.log(colorImageData);

    for (var i = 0; i < colorImageData.length; i += 4) {
        //colorImageData[i] = 0;
        //colorImageData[i + 1] = 0;
        //colorImageData[i + 2] = 0;
    }

    console.log(colorImageData);

    c.putImageData(colorImageData, 0, 0);
    var im = new Image();
    im.src = canvas.toDataURL();
    console.log(im);
    c.drawImage(im, 20, 20);
        
        
    */

    //c.fillStyle = "BLUE";
    //c.fillRect(0, 0, width, height);

    /*
        
    var image = new Image();
    image.src = imageSource;
    var imageWidth = image.width;
    var imageHeight = image.height;
    var imageData = c.getImageData(0, 0, imageWidth, imageHeight);

    var data = imageData.data;


    for (var i = 0, n = data.length; i < n; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var alpha = data[i + 3];
    }

    // pick out pixel data from x, y coordinate
    var x = 20;
    var y = 20;
    var red = data[((imageWidth * y) + x) * 4];
    var green = data[((imageWidth * y) + x) * 4 + 1];
    var blue = data[((imageWidth * y) + x) * 4 + 2];
    var alpha = data[((imageWidth * y) + x) * 4 + 3];

    // iterate over all pixels based on x and y coordinates
    for (var y = 0; y < imageHeight; y++) {
        // loop through each column
        for (var x = 0; x < imageWidth; x++) {
            var red = data[((imageWidth * y) + x) * 4];
            var green = data[((imageWidth * y) + x) * 4 + 1];
            var blue = data[((imageWidth * y) + x) * 4 + 2];
            var alpha = data[((imageWidth * y) + x) * 4 + 3];
        }
    }


    var myImageData = c.createImageData(imageData);
    c.drawImage(image, 0, 0);
        
    */

    window.addEventListener('resize', resize, false);

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

}
