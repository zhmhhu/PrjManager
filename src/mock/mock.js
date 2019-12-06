import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// MockAdapter是一个模拟后台get的请求，es6语法

import Prjs from './data/prjs'
import { LoginUsers, Users } from './data/users';

import Units from './data/units'

let _Users = Users;
let _Prjs = Prjs;
let _Units=Units;

let userMap = LoginUsers;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //把请求发送到服务器，不拦截
    mock.onPost('/api/login').passThrough();
    mock.onPost('/api/current').passThrough();
    mock.onPost('/api/menu').passThrough();


    // 登录相关
    // Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
    // Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
    // Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

    // 登录相关
    // mock.onGet('/api/login/login').reply(config => {
    //   console.log('login:'+config);
    //   const { username } = config.params;
    //   let mockUserMap = userMap[username];
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         data: mockUserMap
    //       }]);
    //     }, 500);
    //   });
    // });

    // mock.onGet('/api/login/logout').reply(config => {
    //   return new Promise((resolve, reject) => {
    //       resolve([200, {
    //         msg: '操作成功'
    //       }]);
    //   });
    // });

    // mock.onGet('/api/user/info').reply(config => {
    //   const { token } = config.params;
    //   let mockUserMap = userMap[token];
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         data: mockUserMap
    //       }]);
    //     }, 500);
    //   });
    // });

    // //获取用户列表
    // mock.onGet('/api/user/list').reply(config => {
    //   console.log(config);
    //   //config.params放的是用户输入的name,params是user.vue中传递的
    //   let { name } = config.params;
    //   let mockUsers = _Users.filter(user => {
    //     if (name && user.name.indexOf(name) == -1) return false;
    //     return true;
    //   });
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         users: mockUsers
    //       }]);
    //     }, 1000);
    //   });
    // });

    // //获取用户列表（分页）
    mock.onGet('/api/user/listpage').reply(config => {

      let { page, name } = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }]);
        }, 1000);
      });
    });


    // //获取项目列表（分页）
    mock.onGet('/api/user/prjpage').reply(config => {

      let { page, prjname } = config.params;
      let mockPrjs = _Prjs.filter(user => {
        if (prjname && user.prjname.indexOf(prjname) == -1) return false;
        return true;
      });
      let total = mockPrjs.length;
      mockPrjs = mockPrjs.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockPrjs
          }]);
        }, 1000);
      });
    });


    // //删除用户
    // mock.onGet('/api/user/remove').reply(config => {
    //   let { id } = config.params;
    //   _Users = _Users.filter(u => u.id !== id);
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         code: 200,
    //         msg: '删除成功'
    //       }]);
    //     }, 500);
    //   });
    // });

    // //批量删除用户
    // mock.onGet('/api/user/batchremove').reply(config => {
    //   let { ids } = config.params;
    //   ids = ids.split(',');
    //   _Users = _Users.filter(u => !ids.includes(u.id));
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         code: 200,
    //         msg: '删除成功'
    //       }]);
    //     }, 500);
    //   });
    // });

    // //编辑用户
    // mock.onGet('/api/user/edit').reply(config => {
    //   let { id, name, addr, age, birth, sex } = config.params;
    //   _Users.some(u => {
    //     if (u.id === id) {
    //       u.name = name;
    //       u.addr = addr;
    //       u.age = age;
    //       u.birth = birth;
    //       u.sex = sex;
    //       return true;
    //     }
    //   });
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         code: 200,
    //         msg: '编辑成功'
    //       }]);
    //     }, 500);
    //   });
    // });

    // //新增用户
    // mock.onGet('/api/user/add').reply(config => {
    //   let { name, addr, age, birth, sex } = config.params;
    //   _Users.push({
    //     name: name,
    //     addr: addr,
    //     age: age,
    //     birth: birth,
    //     sex: sex
    //   });
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         code: 200,
    //         msg: '新增成功'
    //       }]);
    //     }, 500);
    //   });
    // });

    mock.onGet('/api/unit/info').reply(config => {
      const { page,type } = config.params;
      let mockUnits  = _Units.filter(u => u.type == type);
      let total = mockUnits.length;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total:total,
            data: mockUnits
          }]);
        }, 500);
      });
    });

    // 默认不拦截任何请求
    // mock.onAny().passThrough();
  }
};