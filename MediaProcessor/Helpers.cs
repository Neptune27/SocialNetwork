using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaProcessor;

public static class Helpers
{
    public static string FileNameWithoutExtension(string input)
    {
        var ext = input.LastIndexOf(".");
        if (ext <= 0)
        {
            return input;
        }
        return input[..ext];
    }
}
