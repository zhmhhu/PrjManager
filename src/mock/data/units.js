import Mock from 'mockjs';

  const Units = [];
  var Random = Mock.Random 



 var  typeOptions = [
    {
        value: "construct",
        id:"(0)",
        label: "施工单位"
    },
    {
        value: "supervise",
        id:"(1)",
        label: "监理单位"
    },
    {
      value: "design",
      id:"(2)",
      label: "设计单位"
    },
    {
      value: "build",
      id:"(3)",
      label: "建设单位"
    }, 
    {
      value: "survey",
      id:"(4)",
      label: "勘察单位"
  },
];


  Random.extend({
    //单位类型ID
    companytype: function() {
      return this.pick(typeOptions)
    },
})

  for (let i = 0; i < 100; i++) {
    let companytype = Mock.Random.companytype();
    Units.push(Mock.mock({
      companyid: Mock.Random.guid(),
      companytypeid:companytype.id,//使用扩展的数据模板
      companytypename:companytype.label,//使用扩展的数据模板
      type:companytype.value,
      companyname_ch:Mock.Random.cword(5,10)+'有限公司',
      legalrepresentative:Mock.Random.cname(),
      businessrange_ch: Mock.mock('@county(true)'),
      contantmobilenumber: '13'+ Mock.Random.integer(100000000, 999999999),
    }));
  }

  export default Units ;