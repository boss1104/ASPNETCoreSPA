﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace AspNetCoreSpa.Core.Entities
{
    public class ProductCategory : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
