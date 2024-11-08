using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Helpers;

public enum EFileType
{
    BIN,
    IMAGE,
    VIDEO
}

public static class FileHelpers
{
    public static readonly List<string> ImageExtension = ["png", "jpg", "heic", "jpeg", "webp"];
    public static readonly List<string> VideoExtension = ["mp4", "mkv"];


    //Ad-hoc get file type by extension
    public static EFileType GetFileType(string fileName)
    {
        if (ImageExtension.Any(fileName.EndsWith))
        {
            return EFileType.IMAGE;
        }

        if (VideoExtension.Any(fileName.EndsWith))
        {
            return EFileType.VIDEO;
        }

        return EFileType.BIN;
    }
}
