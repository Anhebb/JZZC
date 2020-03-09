// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var dat =event
  console.log("打印",dat)
  switch(event.todo){
    case 'address':
      try {
        return await db.collection('userInfo').doc(event.id).update({
          // data 传入需要局部更新的数据
          data: {
            address: _.push({
                    name:event.name,
                    phone:event.phone,
                    address:event.address,
                    default:event.default,
                  })
          }
        })
      } catch (e) {
        console.error(e)
      }
      break;
      case 'register' :
        console.log("调用了云函数",event)
        try {
          return await db.collection('userInfo').doc(event.id).update({
            // data 传入需要局部更新的数据
            data: {
              name:event.userName,
               phone:event.phone,
               sex:event.sex,
               ['userInfo.nickName']:event.nickName
            }
          })
        } catch (e) {
          console.error(e)
        }
      break;
  }
  
}