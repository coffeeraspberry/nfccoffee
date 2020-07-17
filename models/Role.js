const Sequelize= require('sequelize');
const db= require('../db');
const Model = Sequelize.Model;

/*  
Role 
{
    Roleid : PRIMARY KEY
    RoleNAME : STRING
}
*/

 class Role extends Model {
 }

 Role.init({
  // attributes
  RoleId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  RoleName: Sequelize.STRING,
}, {
    sequelize: db,
    modelName: 'Role'
  
  // options
}
);

Role.insert_default= async ()=>{

   const empt = await Role.count().then((c)=>{return c});

    if(empt == 0 ){
        const adm= await Role.create({RoleName: 'admin'});
        Role.create({RoleName: 'user'});
        return adm;
    } else {
      console.log('\n *** ROLE HAS ALREADY DEFAULT *** \n ');
    }
}
    
module.exports = Role;