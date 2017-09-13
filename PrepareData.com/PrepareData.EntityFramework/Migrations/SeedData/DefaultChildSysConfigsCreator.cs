using System.Linq;
using PrepareData.EntityFramework;
using PrepareData.MultiTenancy;
using PrepareData.ChildSysConfigs;
using System;

namespace PrepareData.Migrations.SeedData
{
    public class DefaultChildSysConfigsCreator
    {
        private readonly PrepareDataDbContext _context;

        public DefaultChildSysConfigsCreator(PrepareDataDbContext context)
        {
            _context = context;
        }

        public void Create(int? tenantId)
        {
            CreateChildSysConfigs(tenantId);
        }

        private void CreateChildSysConfigs(int? tenantId)
        {
            //Default tenant

            var defaultTenant = _context.ChildSysConfigs.Count(o=>o.TenantId== tenantId);
            if (defaultTenant<1)
            {
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "name",DisplayName = "����", Type=EnumConfigType.Text,IsShow=true,CreationTime=DateTime.Now,TenantId=tenantId });
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "logo", DisplayName = "logo", Type = EnumConfigType.Img, IsShow = true, CreationTime = DateTime.Now, TenantId = tenantId });
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "briefing ", DisplayName = "���", Type = EnumConfigType.Multiline, IsShow = false, CreationTime = DateTime.Now, TenantId = tenantId });
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "content", DisplayName = "����", Type = EnumConfigType.Textarea, IsShow = false, CreationTime = DateTime.Now, TenantId = tenantId });
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "sige", DisplayName = "��ҳ��Ŀ", Type = EnumConfigType.Radio, IsShow = true, CreationTime = DateTime.Now, TenantId = tenantId });
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "article", DisplayName = "������Ŀ", Type = EnumConfigType.Checkbox, IsShow = true, CreationTime = DateTime.Now, TenantId = tenantId });
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "backimg", DisplayName = "����ͼ", Type = EnumConfigType.Img, IsShow = true, CreationTime = DateTime.Now, TenantId = tenantId });
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "adimg", DisplayName = "���ͼ", Type = EnumConfigType.Img, IsShow = false, CreationTime = DateTime.Now, TenantId = tenantId });
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "template", DisplayName = "ģ��ѡ��", Type = EnumConfigType.Radio, IsShow = true, CreationTime = DateTime.Now, TenantId = tenantId ,Value=1});
                _context.ChildSysConfigs.Add(new ChildSysConfig { Name = "theme", DisplayName = "������ɫ", Type = EnumConfigType.Radio, IsShow = true, CreationTime = DateTime.Now, TenantId = tenantId });
                _context.SaveChanges();
            }
        }
    }
}
