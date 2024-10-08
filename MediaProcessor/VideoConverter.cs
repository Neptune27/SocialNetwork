using FFMpegCore;
using FFMpegCore.Enums;
using System.Diagnostics;

namespace MediaProcessor;


public class VideoConverter
{
    public static string Directory { get; } = Environment.CurrentDirectory;
    public static string FFMpegDir { get; } = Path.Combine(Directory, "..\\MediaProcessor\\FFMpeg\\");

    public static void Convert(string input, string output)
    {
        GlobalFFOptions.Configure(new FFOptions { BinaryFolder = FFMpegDir, TemporaryFilesFolder = "/tmp" });

        FFMpegArguments
    .FromFileInput(input)
    .OutputToFile(output, true, options => options
        .WithConstantRateFactor(21)
        .WithVideoCodec("h264_nvenc")
        .WithAudioCodec(AudioCodec.Aac)
        .WithVariableBitrate(4)
        .WithVideoFilters(filterOptions => filterOptions
            .Scale(VideoSize.Hd))
        .WithFastStart())
    .NotifyOnProgress(timeAt =>
    {
        Debug.Write(timeAt.ToString() + "\n");
    }).ProcessAsynchronously();
    ;

        
    }

}
