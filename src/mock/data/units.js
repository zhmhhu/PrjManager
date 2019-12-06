import Mock from 'mockjs';

  const Units = [];
  var Random = Mock.Random 
  Random.extend({
    position: function() {
        var positions = ['董事长', '总经理', '主管', '主任', '科长']
        return this.pick(positions)
    }
})

Random.extend({
  type: function() {
      var types = ['build', 'design', 'construct', 'supervise']
      return this.pick(types)
  }
})

  for (let i = 0; i < 100; i++) {
    Units.push(Mock.mock({
      id: Mock.Random.guid(),
      type:Random.type(),//使用扩展的数据模板
      name:Mock.Random.cword(5,10)+'有限公司',
      leadername:Mock.Random.cname(),
      position:Random.position(),
      addr: Mock.mock('@county(true)'),
      phone: '13'+ Mock.Random.integer(100000000, 999999999),
    }));
  }

  export default Units ;