import Mock from 'mockjs';

// const LoginUsers = [
//     {
//       id: 1,
//       username: 'admin',
//       password: '123456',
//       avatar: './static/user/userpic.jpg',
//       name: '管理员'
//     }
//   ];
 
  
  const LoginUsers = {
    admin: {
      roles: ['admin'],
      token: 'admin',
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    },
    editor: {
      roles: ['editor'],
      token: 'editor',
      introduction: '我是编辑',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Normal Editor'
    }
  }

  const Users = [];
  
  for (let i = 0; i < 16; i++) {
    Users.push(Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    }));
  }

  
  export {LoginUsers,Users} ;