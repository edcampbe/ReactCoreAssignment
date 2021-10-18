using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using EsportBasicAPI.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace EsportBasicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IConfiguration _Config;
        private readonly IWebHostEnvironment _host;
        public PlayerController(IConfiguration config, IWebHostEnvironment host)
        {
            _Config = config;
            _host = host;

        }
        [HttpGet]
        public JsonResult Get()
        {
            string strSqlQuery = @"
            SELECT 
            [PlayerId],
            [PlayerName],
            [PlayerOrg],
            convert(varchar(15),[ContractStartDate],120) as ContractStartDate,
            convert(varchar(15),[ContractEndDate],120) as ContractEndDate,
            [PhotoFileName] 
            FROM 
            [dbo].[Players]
            ";
            DataTable dtOrg = new DataTable();
            string strSqlConnection = _Config.GetConnectionString("EsportAppCon");
            SqlDataReader sqlReader;

            using (SqlConnection sqlConnection = new SqlConnection(strSqlConnection))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCmd = new SqlCommand(strSqlQuery, sqlConnection))
                {
                    sqlReader = sqlCmd.ExecuteReader();
                    dtOrg.Load(sqlReader);
                    sqlReader.Close();
                    sqlConnection.Close();
                }
            }
            return new JsonResult(dtOrg);
        }
        [HttpPost]
        public JsonResult Post(Player player)
        {
            string strSqlQuery = @"
            INSERT INTO [dbo].[Players] 
            (
                [PlayerName],
                [PlayerOrg],
                [ContractStartDate],
                [ContractEndDate],
                [PhotoFileName]
            )
            VALUES 
            (
                '[PARAM_PlayerName]',
                '[PARAM_PlayerOrg]',
                '[PARAM_ContractStartDate]',
                '[PARAM_ContractEndDate]',
                '[PARAM_PhotoFileName]'
            )
            ";
            strSqlQuery = strSqlQuery.Replace("[PARAM_PlayerName]", player.PlayerName)
                                     .Replace("[PARAM_PlayerOrg]", player.PlayerOrg)
                                     .Replace("[PARAM_ContractStartDate]", player.ContractStartDate)
                                     .Replace("[PARAM_ContractEndDate]", player.ContractEndDate)
                                     .Replace("[PARAM_PhotoFileName]", player.PhotoFileName);
            DataTable dtOrg = new DataTable();
            string strSqlConnection = _Config.GetConnectionString("EsportAppCon");
            SqlDataReader sqlReader;

            using (SqlConnection sqlConnection = new SqlConnection(strSqlConnection))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCmd = new SqlCommand(strSqlQuery, sqlConnection))
                {
                    sqlReader = sqlCmd.ExecuteReader();
                    dtOrg.Load(sqlReader);
                    sqlReader.Close();
                    sqlConnection.Close();
                }
            }
            return new JsonResult("Added Successfully!");
        }
        [HttpPut]
        public JsonResult Put(Player player)
        {
            string strSqlQuery = @"
            UPDATE [dbo].[Players] SET

                [PlayerName] = '[PARAM_PlayerName]',
                [PlayerOrg] = '[PARAM_PlayerOrg]',
                [ContractStartDate] = '[PARAM_ContractStartDate]',
                [ContractEndDate] =  '[PARAM_ContractEndDate]',
                [PhotoFileName] = '[PARAM_PhotoFileName]'     

            WHERE [PlayerId] = [PARAM_ID]
            ";
            strSqlQuery = strSqlQuery.Replace("[PARAM_ID]", player.PlayerId.ToString())
                                     .Replace("[PARAM_PlayerName]", player.PlayerName)
                                     .Replace("[PARAM_PlayerOrg]", player.PlayerOrg)
                                     .Replace("[PARAM_ContractStartDate]", player.ContractStartDate)
                                     .Replace("[PARAM_ContractEndDate]", player.ContractEndDate)
                                     .Replace("[PARAM_PhotoFileName]", player.PhotoFileName);
            DataTable dtOrg = new DataTable();
            string strSqlConnection = _Config.GetConnectionString("EsportAppCon");
            SqlDataReader sqlReader;

            using (SqlConnection sqlConnection = new SqlConnection(strSqlConnection))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCmd = new SqlCommand(strSqlQuery, sqlConnection))
                {
                    sqlReader = sqlCmd.ExecuteReader();
                    dtOrg.Load(sqlReader);
                    sqlReader.Close();
                    sqlConnection.Close();
                }
            }
            return new JsonResult("Updated Successfully!");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string strSqlQuery = @"
            DELETE FROM [dbo].[Players] 
            WHERE [PlayerId] = [PARAM_ID]
            ";
            strSqlQuery = strSqlQuery.Replace("[PARAM_ID]", id.ToString());
            DataTable dtOrg = new DataTable();
            string strSqlConnection = _Config.GetConnectionString("EsportAppCon");
            SqlDataReader sqlReader;

            using (SqlConnection sqlConnection = new SqlConnection(strSqlConnection))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCmd = new SqlCommand(strSqlQuery, sqlConnection))
                {
                    sqlReader = sqlCmd.ExecuteReader();
                    dtOrg.Load(sqlReader);
                    sqlReader.Close();
                    sqlConnection.Close();
                }
            }
            return new JsonResult("Deleted Successfully!");
        }
        [Route("SaveFile")]
        [HttpPost]
        public  JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _host.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath,FileMode.Create))
                {
                    postedFile.CopyTo(stream);

                }
                return new JsonResult(filename);
            }
            catch(Exception ex)
            {
                return new JsonResult("blank.png");
            }
        }
        [Route("GetAllOrganizationsNames")]
        [HttpGet]
        public JsonResult GetAllOrganizationsNames()
        {
            string strSqlQuery = @"SELECT [OrganizationName] FROM [dbo].[Organizations] ";
            DataTable dtOrg = new DataTable();
            string strSqlConnection = _Config.GetConnectionString("EsportAppCon");
            SqlDataReader sqlReader;

            using (SqlConnection sqlConnection = new SqlConnection(strSqlConnection))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCmd = new SqlCommand(strSqlQuery, sqlConnection))
                {
                    sqlReader = sqlCmd.ExecuteReader();
                    dtOrg.Load(sqlReader);
                    sqlReader.Close();
                    sqlConnection.Close();
                }
            }
            return new JsonResult(dtOrg);
        }

    }
}
