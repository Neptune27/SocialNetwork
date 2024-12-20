﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Core.Models;

public class BasicUser : BaseModel
{
    [Key]
    public string Id { get; set; }

    public string Name { get; set; }

    public string Picture { get; set; }

}
