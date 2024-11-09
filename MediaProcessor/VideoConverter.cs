using FFMpegCore;
using FFMpegCore.Enums;
using System.Diagnostics;

namespace MediaProcessor;


public class VideoConverter
{
    public static string Directory { get; } = Environment.CurrentDirectory;
    public static string FFMpegDir { get; } = Path.Combine(Directory, "..\\MediaProcessor\\FFMpeg\\");

    public static async void Convert(string input, string output, Action<TimeSpan> callback)
    {
        GlobalFFOptions.Configure(new FFOptions { BinaryFolder = FFMpegDir, TemporaryFilesFolder = "/tmp" });

        var outputFile = Helpers.FileNameWithoutExtension(output);

        var arg = FFMpegArguments
            .FromFileInput(input)
            .OutputToFile(outputFile + "mp4", true, options => options
                .WithConstantRateFactor(21)
                .WithVideoCodec("h264_nvenc")
                .WithAudioCodec(AudioCodec.Aac)
                .WithVariableBitrate(4)
                .WithVideoFilters(filterOptions => filterOptions
                    .Scale(VideoSize.Hd))
                .WithFastStart())
            .NotifyOnProgress(callback);
        await (arg.ProcessAsynchronously());


    }

}
