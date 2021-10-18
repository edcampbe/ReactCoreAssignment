using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EsportBasicAPI.Models
{
    public class Player
    {
        public int PlayerId { get; set; }
        public string PlayerName { get; set; }
        public string PlayerOrg { get; set; }
        public string ContractStartDate { get; set; }
        public string ContractEndDate { get; set; }
        public string PhotoFileName { get; set; }

    }
}
