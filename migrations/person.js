
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable(
	  'person',
	  {
	    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	    email: { type: Sequelize.STRING, allowNull: false, unique: true },
	    name_first: { type: Sequelize.STRING, allowNull: false },
	    name_last: { type: Sequelize.STRING, allowNull: false },
	    password: { type: Sequelize.STRING, allowNull: false },
	    salt: { type: Sequelize.STRING, allowNull: false },
	    password_changed_at: { type: Sequelize.DATE, allowNull: true },
	    reset_password_token: { type: Sequelize.STRING, allowNull: true },
	    reset_password_expires_at: { type: Sequelize.DATE, allowNull: true },
	    remember_created_at: { type: Sequelize.DATE, allowNull: true },
	    confirmation_token: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
	   	confirmed_at: { type: Sequelize.DATE, allowNull: true },
	    confirmation_sent_at: { type: Sequelize.DATE, allowNull: true },
	    unconfirmed_email: { type: Sequelize.STRING, allowNull: true, defaultValue: null },
	    status: { type: Sequelize.ENUM, values: ['r','a','s','d'], allowNull: false, defaultValue: 'r' },
	    role: { type: Sequelize.ENUM, values: ['admin','user'], allowNull: false, defaultValue: 'user' },
			login_count: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
	    current_sign_in_at: { type: Sequelize.DATE, allowNull: true },
	   	current_sign_in_ip: { type: Sequelize.STRING, allowNull: true },
	   	last_sign_in_at: { type: Sequelize.DATE, allowNull: true },
	    last_sign_in_ip: { type: Sequelize.STRING, allowNull: true },
	    failed_attempts: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 }, 
	    locked_at: { type: Sequelize.DATE, allowNull: true },
	    created_at: { type: Sequelize.DATE, allowNull: true },
	    updated_at: { type: Sequelize.DATE, allowNull: true },
	    deleted_at: { type: Sequelize.DATE, allowNull: true }
	  },
	  {
	    engine: 'INNODB', // default: 'InnoDB'
	    charset: 'utf8',
    	collate: 'utf8_general_ci'
	  })
  },
 
  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('person');
  }
}