﻿using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaProcessor;

public class ImageConverter
{
    public static async Task DefaultConvert(string input, string output)
    {
        using Image image = await Image.LoadAsync(input);
        await image.SaveAsWebpAsync(output, new WebpEncoder()
        {
            Quality = 70
        });
    }

}
