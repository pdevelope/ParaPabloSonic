﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace OurSonic
{
    /// <summary>
    /// Summary description for ReflectImage
    /// </summary>
    public class ReflectImage : IHttpHandler
    {
        private string directory = ConfigurationManager.AppSettings["Directory"];

        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.Files.Count==1)


                context.Response.ContentType = "image/x-ms-bmp";
            var st = context.Request.Files[0].InputStream;
            byte[] j = new byte[st.Length];
            st.Read(j, 0, (int) st.Length);
            
            context.Response.Write(Convert.ToBase64String(j));
            return;



            {
                var img=new Bitmap(context.Request.Files[0].InputStream);
                var d = directory + "tmp" + Guid.NewGuid() + ".bmp";
                img.Save(d, ImageFormat.Bmp);

                var dc = File.ReadAllBytes(d);
                Convert.ToBase64String(dc);
                context.Response.ContentType = "image/x-ms-bmp";
                context.Response.Write(Convert.ToBase64String(dc));
                File.Delete(d);
            }


        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}