import Mock from 'mockjs';


const Prjs =[];

for (let i = 0; i < 16; i++) {
  Prjs.push(Mock.mock({
    id: Mock.Random.guid(),
    prjname: Mock.Random.cword(2,3)+'水' +Mock.Random.cword( '库闸泵' )+'工程',
    addr: Mock.mock('@county(true)'),
    birth: Mock.Random.date(),
    name:Mock.Random.cname(),
    phone: '13'+ Mock.Random.integer(100000000, 999999999),
    price:  Mock.Random.integer(10, 9999)
  }));
}


export default Prjs ;
////通过向大括号中添加LoginUsers, Users ，变量并且export输出，就可以将对应变量值以LoginUsers, Users 变量标识符形式暴露给其他文件而被读取到
