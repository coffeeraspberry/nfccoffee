const Sequelize= require('sequelize');
const db= require('../db');
const Model = Sequelize.Model;
const bcrypt=require('bcrypt')
/*  
User 
{
    UserID : PRIMARY KEY
    UserName : STRING
    PSKHash: STRING
  LastAccess: DATE
*/


 class User extends Model {
 }

 User.init({
  // attributes
  UserID: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  UserName:{ 
  type : Sequelize.STRING,
  unique:true,
  allowNull: false
}, 
PSKHash:{ 
    type : Sequelize.STRING,
    unique:true,
    allowNull: false
  },
  LastAccess:{ 
    type : Sequelize.DATE
  },
 }, 
 
 {
    sequelize: db,
    modelName: 'User'
  // options
}

 );




 User.insert_default= async (adm)=>{
    let empt = await User.count().then((c)=>{return c});

    if(empt==0)
    {
      const default_password= 'admin';
      const hash= await bcrypt.hash(default_password, 10);
      User.create({UserName: 'admin', PSKHash: hash});
    }else {console.log('\n *** USER DEJA ARE DEFAULT *** \n ')}
  }



module.exports = User;
