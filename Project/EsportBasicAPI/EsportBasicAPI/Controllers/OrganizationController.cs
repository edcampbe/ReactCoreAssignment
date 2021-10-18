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

namespace EsportBasicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        private readonly IConfiguration _Config;
        public OrganizationController(IConfiguration config)
        {
            _Config = config;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string strSqlQuery = @"SELECT [OrganizationId],[OrganizationName] FROM [dbo].[Organizations] ";
            DataTable dtOrg = new DataTable();
            string strSqlConnection= _Config.GetConnectionString("EsportAppCon");
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
        public JsonResult Post(Organization org)
        {
            string strSqlQuery = @"INSERT INTO [dbo].[Organizations] VALUES ('[PARAM_NAME]')";
            strSqlQuery = strSqlQuery.Replace("[PARAM_NAME]", org.OrganizationName);
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
        public JsonResult Put(Organization org)
        {
            string strSqlQuery = @"UPDATE [dbo].[Organizations] SET OrganizationName ='[PARAM_NAME]' 
                                  WHERE OrganizationId = [PARAM_ID]";
            strSqlQuery = strSqlQuery.Replace("[PARAM_NAME]", org.OrganizationName)
                                     .Replace("[PARAM_ID]", org.OrganizationId.ToString());
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
            string strSqlQuery = @"DELETE FROM [dbo].[Organizations] 
                                  WHERE OrganizationId = [PARAM_ID]";
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
    }
}
